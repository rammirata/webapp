const resUtils = require('../utils').response; 
const WalletData = require("../models/WalletData.model");

const getGroupAddressData = async (req, res, next) => {
    const { addressGroup } = req.$scope;

    const addresses = addressGroup.addresses
    console.log(addresses)

    const query = { address: { $in: addresses } };

    try {
        const addressListData = await WalletData.find(query);

        if (addressListData) {
            req.$scope.addressListData = addressListData;
        }
        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    byGroup: getGroupAddressData,
}