// Packages
const express = require("express");
const router = express.Router();
const upload = require("../utils/file.utils");
const uploadPDF = require("../middleware/pdfUpload.middleware");
const { uploadPdf, getPdf } = require("../controllers/pdf.controller");
const isUserLogin = require("../middleware/isUserLogin.middleware");

// Middleware
const {
  validator,
  newNotesValidator,
  noteGetValidator,
} = require("../middleware/notesValidators.middleware");
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
  validator,
  noteController.createNote,
);

router.post("/upload", isUserLogin, uploadPDF.single("pdf"), uploadPdf);

router.get("/getPdf/:pdfId", isUserLogin, getPdf);

router
  .route("/:noteId")
  // GET, PUT, DELETE
  .get(noteGetValidator, validator, noteController.getNote)
  .put(
    upload.single("file"),
    fileValidator,
    newNotesValidator,
    validator,
    noteController.editNote,
  )
  .delete(noteGetValidator, validator, noteController.deleteNote);

// Show Shared note
router.get(
  "/shared/:noteId",
  noteGetValidator,
  validator,
  noteController.showShareNote,
);

// Report Note
router.post(
  "/report/:noteId",
  noteGetValidator,
  validator,
  noteController.reportNote,
);

module.exports = router;
