const express = require("express");
const { body, query, param } = require('express-validator');

const router = express.Router();

const middleware = require("../middleware");
const handlers = require("../handlers");

router.post("/",
  middleware.authenticate.firebaseUser,
  middleware.processFiles.uploadFiles,  // adds file object to req
  middleware.processFiles.checkFileExists,
  middleware.processFiles.processFile, 
  middleware.postAddressGroups.processAddressString,
  middleware.postAddressGroups.checkAddresses,
  middleware.getUser.byFuid,
  middleware.getUser.validate,
  handlers.addressGroups.postAddressGroup
);

router.get("/",
  middleware.authenticate.firebaseUser,
  middleware.getUser.byFuid,
  middleware.getAddressGroup.byUserId,
  handlers.addressGroups.getAddressGroups
);

router.get("/:addressGroupId",
  middleware.authenticate.firebaseUser,
  param('addressGroupId').isString().notEmpty().withMessage('Invalid Resource: Address Group ID'),
  middleware.getUser.byFuid,
  middleware.getAddressGroup.byId,
  handlers.addressGroups.getAddressGroupById
)

module.exports = router;
