const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(express.json());

app.use("/dashboard", require("./routes/dashboard.routes"));
app.use("/notes", require("./routes/notes.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
