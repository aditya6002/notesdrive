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
    .isArray({ min: 1, max: 10 })
    .withMessage("Tags must be an array with at least 1 and at most 10 tags"),
];

const noteGetValidator = [
  body("noteId").isMongoId().withMessage("Invalid note ID"),
];

module.exports = { validator, newNotesValidator, noteGetValidator };
