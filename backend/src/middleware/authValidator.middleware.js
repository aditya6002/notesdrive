const { body, param } = require("express-validator");

const newUserValidator = [
  body("username")
    .isString()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Username is required and must be between 3 and 30 characters",
    ),
  body("fullname")
    .isString()
    .trim()
    .isLength({ min: 5, max: 80 })
    .withMessage(
      "Fullname is required and must be between 5 and 80 characters",
    ),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isString()
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage(
      "Password is required and must be between 6 and 100 characters",
    ),
  body("branch")
    .isString()
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Branch is required and must be between 2 and 80 characters"),
  body("session")
    .isString()
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Session is required and must be between 8 and 20 characters"),
  body("semester")
    .isNumeric()
    .trim()
    .isLength({ min: 1, max: 8 })
    .withMessage(
      "Semester is required and must be between 1 and 8 characters",
    ),
  body("college")
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "College is required and must be between 2 and 100 characters",
    ),
];

const loginValidator = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isString()
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage(
      "Password is required and must be between 6 and 100 characters",
    ),
];

const changePasswordValidator = [
  body("oldPassword")
    .isString()
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage(
      "Old password is required and must be between 6 and 100 characters",
    ),
  body("newPassword")
    .isString()
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage(
      "New password is required and must be between 6 and 100 characters",
    ),
  body("confirmPassword")
    .isString()
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage(
      "Confirm password is required and must be between 6 and 100 characters",
    ),
];

const resetRouteValidator = [
  param("token")
    .isString()
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage("Token is required and must be between 6 and 100 characters"),
];

module.exports = {
  newUserValidator,
  loginValidator,
  changePasswordValidator,
  resetRouteValidator,
};
