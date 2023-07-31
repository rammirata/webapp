const BaseService = require("./Base.service");
const WalletData = require("../models/WalletData.model");

class WalletDataService extends BaseService {
  constructor() {
    super(WalletData);
  }
}

module.exports = new WalletDataService();
