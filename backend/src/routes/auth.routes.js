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
router.post("/login", authController.login);

/**
 * @route GET /api/auth/logout
 * @description Logout user and clear and block cookies
 */
router.get("/logout", authController.logout);


// Testing route for cookie
router.get('/getCookie',authController.getCookie)

/**
 * @route POST /api/auth/reset-password
 * @description PassWord Reset route
 * @body {email}
 * */

router.post("/reset-password", authController.resetPassword);

module.exports = router;
