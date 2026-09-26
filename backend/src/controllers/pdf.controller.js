const supabase = require("../config/supabase.config");
const Pdf = require("../models/pdf.model");
const { containsBannedWord } = require("../utils/contentModeration");

/**
 * @description Upload a PDF file
 * @body {caption: String} - Caption for the PDF
 * @file {File} - PDF file to be uploaded
 * @returns {Object} - The JSON response
 */
const uploadPdf = async (req, res) => {
  try {
    // 1. Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    if (
      !req.body.caption ||
      req.body.caption.trim() === "" ||
      !req.body.tags ||
      req.body.tags.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Caption and tags are required",
      });
    }

    const caption = req.body.caption;

    if (caption && containsBannedWord(caption)) {
      return res.status(400).json({
        success: false,
        message: "Caption contains inappropriate content.",
      });
    }

    const tags = req.body.tags.split(",").map((tag) => tag.trim());

    if (Array.isArray(tags)) {
      const hasBannedTag = tags.some((tag) => containsBannedWord(tag));

      if (hasBannedTag) {
        return res.status(400).json({
          success: false,
          message: "Tags contain inappropriate content.",
        });
      }
    }

    // 2. Get logged-in user
    const userId = req.user.id;

    // 3. Clean original filename
    const originalName = req.file.originalname;

    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");

    // 4. Generate unique filename
    const fileName = `${Date.now()}-${safeName}`;

    // 5. Storage path
    const filePath = `private/${userId}/${fileName}`;

    // 6. Upload to Supabase
    const { data, error } = await supabase.storage
      .from("notesdrive")
      .upload(filePath, req.file.buffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    // 7. Supabase upload error
    if (error) {
      console.error("Supabase upload error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to upload PDF",
      });
    }

    // 8. Generate temporary signed URL
    const { data: signedData, error: signedError } = await supabase.storage
      .from("notesdrive")
      .createSignedUrl(
        data.path,
        60 * 10, // 10 minutes
      );

    // 9. Signed URL error
    if (signedError) {
      console.error("Signed URL error:", signedError);

      return res.status(500).json({
        success: false,
        message: "PDF uploaded but failed to generate URL",
      });
    }

    if (tags.length < 1) {
      return res.status(400).json({
        success: false,
        message: "At least one tag is required",
      });
    }

    const uploadedPdf = await Pdf.create({
      caption: caption,
      pdf: {
        url: signedData.signedUrl,
        id: data.id,
        size: req.file.size,
        originalName,
        mimeType: req.file.mimetype,
        path: data.path,
      },
      userId: userId,
      tags,
    });

    // 10. Success
    return res.status(201).json({
      success: true,
      message: "PDF uploaded successfully",
      data: {
        url: signedData.signedUrl,
        id: uploadedPdf._id,
      },
    });
  } catch (error) {
    console.error("PDF upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

/**
 * @param
 */
const getPdf = async (req, res) => {
  try {
    const { pdfId } = req.params;

    if (!pdfId) {
      return res.status(400).json({ message: "Pdf id is required" });
    }

    const user = req.user;
    console.log(user);

    // Find PDF belonging to logged-in user
    const pdf = await Pdf.findOne({
      _id: pdfId,
      userId: req.user._id,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    // // Generate signed URL
    // const { data, error } = await supabase.storage
    //   .from("notesdrive")
    //   .createSignedUrl(
    //     pdf.storagePath,
    //     60 * 10, // 10 minutes
    //   );

    // if (error) {
    //   console.error("Signed URL error:", error);

    //   return res.status(500).json({
    //     success: false,
    //     message: "Failed to generate PDF URL",
    //   });
    // }

    return res.status(200).json({
      success: true,
      // data: {
      //   id: pdf._id,
      //   originalName: pdf.originalName,
      //   size: pdf.size,
      //   mimeType: pdf.mimeType,
      //   url: data.signedUrl,
      // },
      pdf,
    });
  } catch (error) {
    console.error("Get PDF error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deletePdf = async (req, res) => {
  try {
    const { pdfId } = req.params;

    // Find PDF and verify ownership
    const pdf = await Pdf.findOne({
      _id: pdfId,
      userId: req.user.id,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    // Delete from Supabase
    const { error: storageError } = await supabase.storage
      .from("notesdrive")
      .remove([pdf.pdf.path]);

    if (storageError) {
      console.error("Supabase delete error:", storageError);

      return res.status(500).json({
        success: false,
        message: "Failed to delete PDF from storage",
      });
    }

    // Delete metadata from MongoDB
    await Pdf.findByIdAndDelete(pdfId);

    return res.status(200).json({
      success: true,
      message: "PDF deleted successfully",
    });
  } catch (error) {
    console.error("Delete PDF error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updatePdf = async (req, res) => {
  try {
    const { pdfId } = req.params;
    const { caption, tags } = req.body;

    if (!caption || !caption.trim() || !tags || !tags.trim()) {
      return res.status(400).json({
        success: false,
        message: "All details are required!",
      });
    }

    const pdf = await Pdf.findOne({
      _id: pdfId,
      userId: req.user.id,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    const tagsArray = req.body.tags.split(",").map((tag) => tag.trim());
    if (tags.length < 1) {
      return res.status(400).json({
        success: false,
        message: "At least one tag is required",
      });
    }
    pdf.caption = caption;
    pdf.tags = tagsArray;

    await pdf.save();

    return res.status(200).json({
      success: true,
      message: "PDF updated successfully",
      data: pdf,
    });
  } catch (error) {
    console.error("Update PDF error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  uploadPdf,
  getPdf,
  updatePdf,
  deletePdf,
};
