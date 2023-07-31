const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Mailer = require("../services/sendMail.service");
const WaitlistService = require("../services/Waitlist.service");
const welcomeMailTemplate = require("../config/mail_templates/welcome");

const { body } = require("express-validator");
const handlers = require("../handlers");

router.post("/",
  body('email').isEmail().withMessage("Email is a required field"),
  handlers.waitlist.addWaitlist
);

router.get("/",
  handlers.waitlist.getWaitlist
);

module.exports = router;
