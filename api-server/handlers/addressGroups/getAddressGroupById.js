const resUtils = require('../../utils').response;
/**
 * Get address group by its ID
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @param {Function} next - The next function to execute
 * @returns {Object} The HTTP response body
 */
const getAddressGroupById = async (req, res, next) => {
    const { addressGroup } = req.$scope;
    if (!addressGroup) {
        return res.status(400).json(resUtils.badRequest('Bad Request: Address Group not found'));
    }

    const responseBody = resUtils.success(
        message = "Successfully retrieved address groups.",
        data = { addressGroup }
    );
    return res.json(responseBody);
}

module.exports = getAddressGroupById;