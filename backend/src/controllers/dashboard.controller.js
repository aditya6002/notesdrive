const dashboardData = (req, res) => {
  res.status(200).json({ msg: "request sent", data: "dashboard" });
};

module.exports = {
  dashboardData,
};