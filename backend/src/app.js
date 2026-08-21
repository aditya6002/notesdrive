const express = require("express");
const dotenv = require("dotenv");
const { sendEmail } = require("./services/email.service");
const app = express();
dotenv.config();

// Middleware
app.use(express.json());

// Routes
app.use("/dashboard", require("./routes/dashboard.routes"));
app.use("/notes", require("./routes/notes.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/", async (req, res) => {
  const msg = await sendEmail(
    "ap4464747@gmail.com",
    "Test Email",
    "<h1>Hello from NotesDrive</h1>",
    "Hello from NotesDrive",
  );
  console.log("Email sent:", msg);
  res.status(404).json({ msg: "No route found" });
});

module.exports = app;
