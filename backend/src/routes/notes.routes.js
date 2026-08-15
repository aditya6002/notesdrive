// Packages
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../utils/file.utils");

// Middleware
const {
  validate,
  notesValidator,
} = require("../middleware/validators.middleware");
const fileValidator = require("../middleware/file.middleware");

// Controllers

const noteController = require("../controllers/notes.controller");

// Create new note
router.post(
  "/",
  upload.single("file"),
  fileValidator,
  notesValidator,
  validate,
  noteController.createNote,
);

router
  .route("/:noteId")
  // GET, PUT, DELETE
  .get(noteController.getNote)
  .put(upload.single("file"), notesValidator, validate, noteController.editNote)
  .delete(noteController.deleteNote);

// Show Shared note
router.get("/shared/:noteId", noteController.showShareNote);

// Report Note
router.post("/report/:noteId", noteController.reportNote);

module.exports = router;
