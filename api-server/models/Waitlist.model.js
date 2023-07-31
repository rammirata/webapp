const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const waitlistSchema = new Schema(
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
        "The email used already exists. We are trying hard to get people added on to the platform quickly.",
      ],
    },
    company: {
      type: String,
      required: [true, "`company` is a required field"],
    },
    designation: {
      type: String,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Waitlist =
  mongoose.models.waitlist || mongoose.model("Waitlist", waitlistSchema);

module.exports = Waitlist;
