const BaseService = require("./Base.service");
const WalletTokens = require("../models/WalletTokens.model");

class WalletTokensService extends BaseService {
  constructor() {
    super(WalletTokens);
  }
}

module.exports = new WalletTokensService();
