const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

const { validator } = require("../utils/validator.utils");
const authValidator = require("../middleware/authValidator.middleware");

/**
 * @route POST /api/auth/register
 * @description Register a new user
 */
router.post(
  "/register",
  authValidator.newUserValidator,
  validator,
  authController.register,
);

/**
 * @route POST /api/auth/login
 * @description Login a user
 */
// router.post("/login", authController.login);

module.exports = router;
