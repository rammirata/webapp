const nodemailer = require("nodemailer");

const { mailConfig, transportConfig } = require("../config/mail");

class Mailer {
  transporter = null;
  from = "";

  constructor() {
    this.transporter = nodemailer.createTransport(transportConfig);
    this.from = `"${mailConfig.senderName}" <${mailConfig.email}>`;
  }

  sendMail(emails, subject, body) {
    const mailBody = {
      from: this.from,
      to: emails,
      subject,
      html: body,
    };

    return this.transporter.sendMail(mailBody);
  }
}

module.exports = new Mailer();
