const supabase = require("../config/supabase.config");


const uploadPdf = async (req, res) => {
  try {
    // 1. Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    // 2. Get logged-in user
    const userId = req.user.id;

    // 3. Clean original filename
    const originalName = req.file.originalname;

    const safeName = originalName.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    );

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
    const { data: signedData, error: signedError } =
      await supabase.storage
        .from("notesdrive")
        .createSignedUrl(
          data.path,
          60 * 10 // 10 minutes
        );

    // 9. Signed URL error
    if (signedError) {
      console.error("Signed URL error:", signedError);

      return res.status(500).json({
        success: false,
        message: "PDF uploaded but failed to generate URL",
      });
    }

    // 10. Success
    return res.status(201).json({
      success: true,
      message: "PDF uploaded successfully",

      data: {
        path: data.path,
        id: data.id,
        fullPath: data.fullPath,

        originalName,
        size: req.file.size,
        mimeType: req.file.mimetype,

        // PDF viewing URL
        url: signedData.signedUrl,
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


const getPdf = async (req, res) => {
  try {
    const { pdfId } = req.params;

    // Find PDF belonging to logged-in user
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

    // Generate signed URL
    const { data, error } = await supabase.storage
      .from("notesdrive")
      .createSignedUrl(
        pdf.storagePath,
        60 * 10 // 10 minutes
      );

    if (error) {
      console.error("Signed URL error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to generate PDF URL",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: pdf._id,
        originalName: pdf.originalName,
        size: pdf.size,
        mimeType: pdf.mimeType,
        url: data.signedUrl,
      },
    });
  } catch (error) {
    console.error("Get PDF error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};



module.exports = {
  uploadPdf,
  getPdf
};

