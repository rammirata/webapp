const UserService = require("../services/User.service");
const resUtils = require("../utils").response;

const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userDocs = await UserService.getOne({ email });

        if (userDocs) {
            req.$scope.user = userDocs;
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

const getUserByFuid = async (req, res, next) => {
    try {
        const { fuid } = req.$scope;
        const userDocs = await UserService.getOne({ firebaseUid: fuid })
        
        if (userDocs) {
            req.$scope.user = userDocs;
        }

        return next()
    } catch (error) {
        return next(error);
    }
};

const validate = async (req, res, next) => {
    const {user} = req.$scope
    if (!user) {
      return res.status(400).json(resUtils.badRequest('User not found'));
    }
    next();
}

module.exports = {
    byEmail: getUserByEmail,
    byFuid : getUserByFuid,
    validate: validate
};
