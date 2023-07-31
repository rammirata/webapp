const FirebaseService = require("../services/firebase.service");

const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        firebaseUser = await FirebaseService.getFirebaseUser(email);

        if (firebaseUser) {
            req.$scope.firebaseUser = firebaseUser;
        }

        return next();
    } catch (error) {
        // If user is not found, continue
        if (error.errorInfo && error.errorInfo.code == 'auth/user-not-found') {
            return next();
        }
        return next(error);
    }
};

module.exports = {
    byEmail: getUserByEmail
};
