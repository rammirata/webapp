const reqUtils = require('../../utils').response;
const AddressGroupService = require("../../services/AddressGroup.service");

/**
 * Creates a request for address analytics and handles it
 * 
 * @param {Object} req - The HTTP request
 * @param {Object} res - The HTTP response
 * @param {Function} next - The next middleware function in the stack
 * @returns {Promise<Object>} The HTTP response body
 * 
 * @throws {Error} If the request fails
 */
const postAddressGroup = async (req, res, next) => {
    let { addresses } = req.$scope;
    const { user, groupName } = req.$scope;
 
    addresses = addresses.map(address => address.toLowerCase())
    
    try {
        const [addressGroupDoc] = await AddressGroupService.create({
            groupName: groupName || `${addresses[0].slice(0, 6)}-${addresses[addresses.length - 1].slice(0, 6)}`,
            addresses,
            requestBy: user._id
            // requestBy: new ObjectId(user._id.toString())
        });

        console.log(addressGroupDoc)

        AddressGroupService.handleAnalyseRequest(addresses, addressGroupDoc);
        
        const responseBody = reqUtils.success("Successfully requested for address analytics. We will let you know once ready.");
        return res.json(responseBody);
    } catch (error) {
        return next(error);
    }
}

module.exports = postAddressGroup;