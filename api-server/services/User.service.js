const BaseService = require("./Base.service");
const UserModel = require("../models/User.model");
const Mailer = require("../services/sendMail.service");
const FirebaseService = require("../services/firebase.service");
const resetMail = require("../config/mail_templates/resetPwd");
const welcomeResetMail = require("../config/mail_templates/setPassWelcome");

class UserService extends BaseService {
  constructor() {
    super(UserModel);
  }

  async passwordReset(newUser = false, name = null, email = null) {
    email = email || this.Payload.email;
    name = name || this.Payload.name;

    if (!email) {
      throw new Error('User email not found.')
    }
    const passwordResetLink = await FirebaseService.getPasswordResetLink(email);

    const mailTemplate = newUser ? welcomeResetMail : resetMail;
    const { subject, body } = mailTemplate.generateMail(passwordResetLink, name.split(' ')[0]);

    return Mailer.sendMail(email, subject, body); 
  }
}

module.exports = new UserService();
