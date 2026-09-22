const mongoose = require("mongoose");

const pdfModel = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      length: [1, 200],
    },
    pdf: {
      url: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
        unique: true,
      },
      size: {
        type: Number,
        required: true,
      },
      originalName: {
        type: String,
        required: true,
      },
      mimeType: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pdf", pdfModel);
