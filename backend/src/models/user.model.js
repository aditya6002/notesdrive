const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full Name is necessary!"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "Username is necessary!"],
      unique: [true, "Username is already exists!"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is necessary!"],
      unique: [true, "Email is already exists!"],
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email type!",
      ],
    },
    branch: {
      type: String,
      trim: true,
      required: [true, "Branch is necessary!"],
    },
    session: {
      type: String,
      trim: true,
      required: [true, "Session is necessary!"],
    },
    password: {
      type: String,
      required: [true, "Password is necessary!"],
      minlength: [6, "Atleast put 6 characters!"],
      trim: true,
      required: [true, "Password is necessary!"],
    },
    semester: {
      type: String,
      trim: true,
      required: [true, "Semester is necessary!"],
    },
    college: {
      type: String,
      trim: true,
      required: [true, "College is necessary!"],
    },
    resetPasswordToken: {
      type: String,
      trim: true,
      default: null,
    },
    resetPasswordTokenExp: {
      type: Date,
      trim: true,
      default: null,
    },
    profilePic: {
      type: String,
      trim: true,
      default: null,
    },
    role: {
      type: String,
      enum: ["student", "admin", "teacher"],
      default: "student",
      required: true,
      immutable: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const bcrypt = require("bcryptjs");
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.changePassword = async function (newPassword) {
  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(newPassword, salt);
  await this.save();
};

module.exports = mongoose.model("User", userSchema);
