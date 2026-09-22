// Packages
const express = require("express");
const router = express.Router();

const uploadPDF = require("../middleware/pdfUpload.middleware");

// Controllers
const pdfController = require("../controllers/pdf.controller");
const isUserLogin = require("../middleware/isUserLogin.middleware");

// Middleware
const {
  validator,
  newNotesValidator,
  noteGetValidator,
} = require("../middleware/notesValidators.middleware");
const fileValidator = require("../middleware/file.middleware");

/**
 * @route POST /notes
 * @description Create new note
 * @body {caption:'String',tags:[],,file:'application/pdf(50mb)'}
 * @protected
 */
router.post("/", isUserLogin, uploadPDF.single("pdf"), pdfController.uploadPdf);

router.get("/:pdfId", isUserLogin, pdfController.getPdf);

router.patch("/:pdfId", isUserLogin, pdfController.updatePdf);

router.delete("/:pdfId", isUserLogin, pdfController.deletePdf);

module.exports = router;
