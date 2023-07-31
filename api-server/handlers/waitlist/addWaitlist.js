
const Mailer = require("../../services/sendMail.service");
const resUtils = require('../../utils').response;
const WaitlistService = require("../../services/Waitlist.service");
const welcomeMailTemplate = require("../../config/mail_templates/welcome");

/**
 * Adds a new entry to the waitlist and sends a welcome email to the user.
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Object} The response body containing the waitlist data
 * @throws {Error} If an error occurs while processing the request
 */
const addWaitlist = async (req, res, next) => {
    let responseBody;
    try {
        const payload = req.body;

        const newWaitlist = WaitlistService.init(payload);
        const waitlistDocs = new newWaitlist.create();

        const { subject, body } = await welcomeMailTemplate.generateMail(
            payload.name.split(" ")[0] || "Mate"
        );
        
        const emailInfo = await Mailer.sendMail(payload.email, subject, body);
        console.log('Email sent: ', emailInfo);

        responseBody = reqUtils.success(
            message="Successfully added details to waitlist",
            data=waitlistDocs
        )
        
    } catch (error) {
        responseBody = resUtils.badRequest(error.message);
    }
    return res.json(responseBody)  
};

module.exports = addWaitlist;