const express = require("express");
const router = express.Router();
const middleware = require('../middleware');
const handlers = require('../handlers');
const { query, param } = require('express-validator');

router.post("/:addressGroupId",
  middleware.authenticate.firebaseUser,
  param('addressGroupId').isString().notEmpty().withMessage('Invalid Resource: Address Group ID'),
  middleware.getUser.byFuid,
  middleware.getUser.validate,
  middleware.getAddressGroup.byId,
  middleware.buildFilterQuery.build,
  handlers.addressAnalytics.getAddressGroupAnalytics
);

module.exports = router;
