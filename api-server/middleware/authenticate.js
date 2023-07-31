const firebaseAdmin = require("../config/firebase-admin");
const resUtils = require("../utils").response;

const authenticateFirebaseUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(resUtils.error('Unauthorized: Missing or invalid token', 401));
    }

    const idToken = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        req.$scope.fuid = decodedToken.uid;
        return next();
    } catch (error) {
        // console.error('Error verifying token:', error);
        return res.status(401).json(resUtils.error('Unauthorized: Invalid token', 401));
    }
};


module.exports = {
    firebaseUser: authenticateFirebaseUser
};
