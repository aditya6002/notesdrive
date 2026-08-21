const noteModel = require("../models/Note.model");

const createNote = (req, res) => {
  const data = req.body;

  console.log(data);
  res.status(201).json({ msg: "note created", data: "new note", data: data });
};

const getNote = (req, res) => {
  res.status(200).json({ msg: "note found", data: "note" });
};

const editNote = (req, res) => {
  res.status(200).json({ msg: "note updated", data: "edited note" });
};

const deleteNote = (req, res) => {
  res.status(200).json({ msg: "note deleted" });
};

const showShareNote = (req, res) => {
  res.status(200).json({ msg: "shared note found", data: "shared note" });
};

const reportNote = (req, res) => {
  res.status(200).json({ msg: "note reported", data: "reported note" });
};

module.exports = {
  createNote,
  getNote,
  editNote,
  deleteNote,
  showShareNote,
  reportNote,
};
