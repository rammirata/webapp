const UserService = require("../../services/User.service");
const FirebaseService = require("../../services/firebase.service");
const resUtils = require("../../utils").response;

/**
 * Middleware function that creates a new user account
 * @param {Object} req - Express request object with a body that includes the following parameters:
 *                       - fullName: string
 *                       - email: string
 *                       - password: string
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {Object} - Express response object
 */
const createAccount = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    const { user, firebaseUser } = req.$scope;

    if (user || firebaseUser) {
        return res.status(400).json(resUtils.badRequest('Bad Request: User already exists'));
    }

    try {
        const newFirebaseUser = {
            password,
            email,
            emailVerified: false,
            displayName: fullName,
            providerToLink: {
                email,
            },
        };
        
        const { uid: firebaseUid } = await FirebaseService.createFirebaseUser(newFirebaseUser);
        const newUser = UserService.init({ name: fullName, email, firebaseUid });
        
        const userDocs = await newUser.create();

        let resBody = resUtils.success('Successfully added user')
        return res.json(resBody);
    } catch (err) {
        return next(err);
    }
}

module.exports = createAccount;
