const fileValidator = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({ msg: "Only PDF files are allowed" });
  }

  if (req.file.size > 50 * 1024 * 1024) {
    // 50MB
    return res.status(400).json({ msg: "File size exceeds the limit of 50MB" });
  }

  next();
};

module.exports = fileValidator;
