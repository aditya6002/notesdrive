const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const {authenticateToken} = require("../middleware/auth.middleware");

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
router.post("/login", authController.login);

/**
 * @route POST /api/auth/logout
 * @description Logout a user
 */
router.post("/logout",authenticateToken ,authController.logout);

/**
 * @route POST /api/auth/forgot-password
 * @description Forgot password - send OTP to user email
 */

 router.post("/forgot-password"
    ,authController.forgotPassword);
 

/**
 * @route POST /api/auth/reset-password
 * @description Reset user password
 */
router.post("/verify-otp", authController.verifyOtp);   

/**
 * @route POST /api/auth/set-password
 * @description Set user password
 */

router.post("/reset-password/:resetToken", authController.passwordReset);


module.exports = router;
