const BaseService = require("./Base.service");
const WaitlistModel = require("../models/Waitlist.model");

class WaitlistService extends BaseService {
  constructor() {
    super(WaitlistModel);
  }
}

module.exports = new WaitlistService();
