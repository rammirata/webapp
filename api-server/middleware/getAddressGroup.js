const resUtils = require('../utils').response;
const AddressGroupService = require("../services/AddressGroup.service");

const { ObjectId } = require("mongoose").mongo;

const getAddressGroupByUserId = async (req, res, next) => {
    const { user } = req.$scope;
    if (!user) {
        return res.status(400).json(resUtils.badRequest('Bad Request: User not found'));
    }

    try {
        const addressGroups = await AddressGroupService.get({
            requestBy: user._id,
        });

        if (addressGroups) {
            req.$scope.addressGroups = addressGroups;
        }

        return next()
    } catch (error) {
        return next(error);
    }
};

const getAddressGroupById = async (req, res, next) => {
    const { user } = req.$scope;
    const addressGroupId = req.params.addressGroupId || req.body.addressGroupId || req.query.addressGroupId;

    if (!addressGroupId) {
        return res.status(400).json(resUtils.badRequest('Bad Request: Address Group Id not found'));
    }
    
    try {
        const addressGroup = await AddressGroupService.getOne({
            requestBy: user._id,
            _id: new ObjectId(addressGroupId),
        });

        if (!addressGroup) {
            return res.status(400).json(resUtils.badRequest('Bad Request: Address Group not found'));
        }
        req.$scope.addressGroup = addressGroup;

        return next()
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    byUserId: getAddressGroupByUserId,
    byId: getAddressGroupById
};
