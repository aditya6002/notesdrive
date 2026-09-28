const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    const user = await UserModel.findById(data.id);
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
