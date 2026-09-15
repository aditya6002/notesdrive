const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportDescription: {
      required: true,
      type: String,
      min: 3,
      max: 200,
    },
    reportFileTitle: {
      required: true,
      type: String,
      min: 3,
      max: 200,
    },
    reportFile: {
      required: true,
      type: String,
    },
    reportFileTags: {
      required: true,
      type: Array,
      min: 1,
      max: 10,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("reportModel", reportSchema);
