const express = require("express");
const { body } = require('express-validator');
const router = express.Router();
const middleware = require('../middleware');
const handlers = require('../handlers');

router.post("/createAccount",
    body('fullName').isLength({ min: 1 }).withMessage('Invalid Resource: fullName'),
    body('email').isEmail().withMessage('Invalid Resource: email'),
    body('password').isLength({ min: 8 }).withMessage('Invalid Resource: password'),
    middleware.validateParams,
    middleware.getUser.byEmail,
    middleware.getFirebaseUser.byEmail,
    handlers.users.createAccount);

router.post("/resetPwd",
    body('email').isEmail().withMessage('Invalid Resource: email'),
    middleware.validateParams,
    middleware.getUser.byEmail,
    middleware.getFirebaseUser.byEmail,
    handlers.users.resetPwd);

module.exports = router;
