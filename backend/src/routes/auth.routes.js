const express = require("express");
const router  =  express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @route POST /api/auth/register
 * @description Register a new user
 */
router.post("/register", authController.register);

/**
 * @route POST /api/auth/login
 * @description Login a user
 */
// router.post("/login", authController.login);

module.exports = router;