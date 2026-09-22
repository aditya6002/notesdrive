const multer = require("multer");

const storage = multer.memoryStorage();

const uploadPdf = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed!"));
    } else {
      cb(null, true);
    }
  },
});

module.exports = uploadPdf;
