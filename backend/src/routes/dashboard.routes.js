// Packages
const express = require("express");
const router = express.Router();

//  Dashboard Controllers
const dashboardController = require("../controllers/dashboard.controller");

/**
 * @route /dashboard
 * @protected
 */
router.get("/", dashboardController.dashboardData);

module.exports = router;
