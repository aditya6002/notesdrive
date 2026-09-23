// Packages
const express = require("express");
const router = express.Router();

//  Dashboard Controllers
const dashboardController = require("../controllers/dashboard.controller");
const isUserLogin = require("../middleware/isUserLogin.middleware");

/**
 * @route /dashboard
 * @protected
 */
router.get("/", isUserLogin, dashboardController.dashboardData);

module.exports = router;
