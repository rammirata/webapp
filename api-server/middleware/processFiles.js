const {readZippedCSV} = require('../utils').readZippedCSV;
const resUtils = require("../utils").response;
const multer = require('multer');

// adds files object to req
const uploadFiles = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5242880 } // 5 MB in bytes
  }).any()

const checkFileExists = async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json(resUtils.badRequest('Invalid Resource: file or addresses field not found'));
    }
    next();
  };

const processFile = async (req, res, next) => {
  try {
    if (req.files && req.files.length !== 0) {
      const originalName = req.files[0].originalname;
      const nameCleaned = originalName.replace(/\.csv$/, '').replace(/\.zip$/, '');
      const addresses = await readZippedCSV(req.files[0].buffer);
      req.$scope.addresses = addresses;
      req.$scope.groupName = nameCleaned;
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
    uploadFiles,
    checkFileExists,
    processFile
};
