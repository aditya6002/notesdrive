// Packages
const express = require("express");
const router = express.Router();

//  Dashboard Controllers
const dashboardController = require("../controllers/dashboard.controller");

// Dashboard data route
router.get("/", dashboardController.dashboardData);







module.exports = router;
