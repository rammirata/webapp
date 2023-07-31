const BaseService = require("./Base.service");
const AddressGroup = require("../models/AddressGroup.model");
const analyseAddresses = require("../adapters/analyseAddresses");

const EmailService = require("./sendMail.service");
const UserService = require("./User.service");
const WalletData = require("../models/WalletData.model");

const requestProcessedMail = require("../config/mail_templates/requestProcessed");
const { sliceToChunks, difference } = require("../utils");

class AddressGroupService extends BaseService {
  constructor() {
    super(AddressGroup);
  }

  async handleAnalyseRequest(addresses, reqAddressDoc) {
    try {
      // filter addresses that have already been analyzed
      const oneDay = 24 * 60 * 60 * 1000; // number of milliseconds in one day
      const oneDayAgo = new Date(Date.now() - oneDay); // date that is one day ago
      const walletQuery = {
        'address': {'$in': addresses},
        'status': 'success',
        'updatedAt': {'$gte': oneDayAgo}
      };
      let processedAddresses = await WalletData.find(walletQuery)
      processedAddresses = processedAddresses.map(wallet => wallet.address);
      const newAddresses = difference(addresses, processedAddresses);

      // analyze the addresses not analyzed with python script
      if (newAddresses.length > 0) {
        console.log("Analysing...");
        const analysisData = await analyseAddresses(newAddresses);
  
        const { success, data, message } = analysisData;
  
        if (!success) throw new Error(message);
      }

      const requestId = reqAddressDoc._id.toString();
      this.update({ _id: requestId }, { isProcessed: true });

      const user = await UserService.getOne({
        _id: reqAddressDoc.requestBy,
      });

      const viewLink = `https://app.blockway.tech/analytics?request=${requestId}`;

      const { subject, body } = requestProcessedMail.generateMail(
        viewLink,
        addresses.length
      );

      const emailInfo = await EmailService.sendMail(user.email, subject, body);
      console.log('Email sent: ', emailInfo);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AddressGroupService();
