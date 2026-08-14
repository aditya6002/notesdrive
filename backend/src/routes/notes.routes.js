// Packages
const express = require("express");
const router = express.Router();

const noteController = require("../controllers/notes.controller");

// Create new note
router.post("/", noteController.getNote);

router
    .route("/:noteId")
    // GET, PUT, DELETE
    .get(noteController.getNote)
    .put(noteController.editNote)
    .delete(noteController.deleteNote);

// Show Shared note
router.get("/shared/:noteId", noteController.showShareNote);

// Report Note
router.post("/report/:noteId", noteController.reportNote);

module.exports = router;
