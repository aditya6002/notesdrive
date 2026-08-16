const { validationResult } = require("express-validator");
const { body } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

const notesValidator = [
  body("title")
    .isString()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title is required and must be between 3 and 200 characters"),
  body("tags")
    .trim()
    .isArray({ min: 1, max: 10 })
    .withMessage("Tags must be an array with at least 1 and at most 10 tags"),
];

module.exports = { validate, notesValidator };
