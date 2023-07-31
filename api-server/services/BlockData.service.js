const BaseService = require("./Base.service");
const BlockData = require("../models/BlockData.model");

class BlockDataService extends BaseService {
  constructor() {
    super(BlockData);
  }
}

module.exports = new BlockDataService();
