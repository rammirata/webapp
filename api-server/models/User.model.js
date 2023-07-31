const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "`name` is a required field"],
    },
    email: {
      type: String,
      required: [true, "`email` is a required field"],
      unique: [
        true,
        "The email used already exists.",
      ],
    },
    firebaseUid: {
      type: String,
      required: [true, "`firebaseUid` is a required field"],
      unique: [
        true,
        "The firebase uid used already exists.",
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("User", userSchema);

module.exports = User;
