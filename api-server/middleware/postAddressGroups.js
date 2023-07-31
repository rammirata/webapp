const resUtils = require('../utils').response; 

const processAddressString = async (req, res, next) => {
  if (!req.$scope.addresses && req.body.addresses) {
    const addressesList = req.body.addresses.split(',');
    req.$scope.addresses = addressesList;
    req.$scope.groupName = addressesList[0];
  }
  next();
};

const checkAddresses = async (req, res, next) => {
  const { addresses } = req.$scope;

  if (!addresses) {
    return res.status(400).json(resUtils.badRequest('Incorrect input'));
  }

  if (!Array.isArray(addresses) || addresses.length === 0) {
    return res.status(400).json(resUtils.badRequest('File format incorrect'));
  }

  for (const address of addresses) {
    if (typeof address !== 'string') {
      return res.status(400).json(resUtils.badRequest('File format incorrect'));
    }
  }
  next();
};

module.exports = {
  processAddressString,
  checkAddresses
};