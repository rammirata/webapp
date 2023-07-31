const UserService = require("../../services/User.service");
const resUtils = require("../../utils").response;

/**
 * Middleware function that resets the password for a user account
 * @param {Object} req - Express request object with a body that includes the following parameters:
 *                       - email: string
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Object} - Express response object
 */
const resetPwd = async (req, res, next) => {
    const { email } = req.body;
    const { user, firebaseUser } = req.$scope;

    try {
        // Check that user exists
        if (!user || !firebaseUser) {
            return res.status(404).json(resUtils.badRequest('Bad request: User not found'));
        }
        
        const userServ = UserService.init({ email });
        const emailInfo = await userServ.passwordReset(false, user.name);
        console.log('Email sent: ', emailInfo);

        let resBody = resUtils.success('Successfully sent password reset link')
        return res.json(resBody);
    } catch (err) {
        return next(err);
    }
}

module.exports = resetPwd;
