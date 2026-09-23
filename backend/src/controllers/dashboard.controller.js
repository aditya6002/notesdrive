const Pdf = require("../models/pdf.model");

const dashboardData = async (req, res) => {
  try {
    const user = req.user;
    const limit = req.query.limit || 20;
    const skip = req.query.skip || 0;
    if (!user) {
      res.status(400).json({ message: "User not logged in " });
    }

    const pdf = await Pdf.find({}).skip(skip).limit(limit);

    res.status(200).json({ message: "Data fetch successfully", data: pdf });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: err?.message || "Internal server error!" });
  }
};

module.exports = {
  dashboardData,
};
