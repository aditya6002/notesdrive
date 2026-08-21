const { validator } = require("../utils/validator.utils");
const { body } = require("express-validator");

const newNotesValidator = [
  body("title")
    .isString()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title is required and must be between 3 and 200 characters"),
  body("tags")
    .trim()
    .isString()
    .isLength({ min: 0, max: 100 })
    .withMessage(
      "Tags must be a string with a maximum length of 100 characters",
    ),
];

const noteGetValidator = [
  body("noteId").isMongoId().withMessage("Invalid note ID"),
];

module.exports = { validator, newNotesValidator, noteGetValidator };
