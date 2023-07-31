const EMAIL_ADDRESS = "business@blockway.tech";
const EMAIL_PASSWORD = process.env.MAIL_PASS;
const SENDER_NAME = "Blockway";

const transportConfig = {
  host: "smtp.zoho.eu",
  // host: "smtppro.zoho.in",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
};

const mailConfig = {
  email: EMAIL_ADDRESS,
  senderName: SENDER_NAME,
};

module.exports = { transportConfig, mailConfig };
