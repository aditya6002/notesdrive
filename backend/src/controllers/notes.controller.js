const newNote = (req, res) => {
  res.status(201).json({ msg: "new note created", data: req.body });
};

const getNote = (req, res) => {
  res.status(200).json({ msg: "note found", data: "note" });
};

const editNote = (req, res) => {
  res.status(200).json({ msg: "note updated", data: "deleted note" });
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
  newNote,
  getNote,
  editNote,
  deleteNote,
  showShareNote,
  reportNote,
};
