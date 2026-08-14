const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.status(201).json({ msg: "new note created", data: req.body });
});

router
  .route("/:noteId")
  .get((req, res) => {
    res.status(200).json({ msg: "note found", data: "note" });
  })

  .put((req, res) => {
    res.status(200).json({ msg: "note updated", data: "deleted note" });
  })

  .delete((req, res) => {
    res.status(200).json({ msg: "note deleted" });
  });

router.get("/shared/:noteId", (req, res) => {
  res.status(200).json({ msg: "shared note found", data: "shared note" });
});

router.post("/report/:noteId", (req, res) => {
  res.status(200).json({ msg: "note reported", data: "reported note" });
});

module.exports = router;
