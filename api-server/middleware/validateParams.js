const { validationResult } = require('express-validator');
const resUtils = require("../utils").response;

// Middleware that validates the params checked by validator
const validateParams = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('error')
        return res.status(400).json(resUtils.validationError(errors.array()));
    }
    return next();
}



module.exports = validateParams;
