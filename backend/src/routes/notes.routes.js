// Packages
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../utils/file.utils");

// Middleware
const {
  validate,
  newNotesValidator,
  noteGetValidator,
} = require("../middleware/validators.middleware");
const fileValidator = require("../middleware/file.middleware");

// Controllers
const noteController = require("../controllers/notes.controller");

/**
 * @route POST /notes
 * @description Create new note
 * @body {title:'String',tags:[],description:'string',file:'file'}
 * @protected
 */
router.post(
  "/",
  upload.single("file"),
  fileValidator,
  newNotesValidator,
  validate,
  noteController.createNote,
);

router
  .route("/:noteId")
  // GET, PUT, DELETE
  .get(noteGetValidator, validate, noteController.getNote)
  .put(
    upload.single("file"),
    fileValidator,
    newNotesValidator,
    validate,
    noteController.editNote,
  )
  .delete(noteGetValidator, validate, noteController.deleteNote);

// Show Shared note
router.get(
  "/shared/:noteId",
  noteGetValidator,
  validate,
  noteController.showShareNote,
);

// Report Note
router.post(
  "/report/:noteId",
  noteGetValidator,
  validate,
  noteController.reportNote,
);

module.exports = router;
