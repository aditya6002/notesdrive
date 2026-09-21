const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const BlacklistToken = require("../models/blacklistToken.model");


const isUserLogin = async (req, res, next) => { 
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Check if the token is blacklisted
        const blacklistedToken = await BlacklistToken.findOne({ jwtToken: token });
        if (blacklistedToken) {
            return res.status(403).json({ message: "Invalid token." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: "Internal server error.", error: err.message });
    }
};

module.exports = isUserLogin;
