const resUtils = require('../../utils').response;

/**
 * Retrieves address analytics for a user and returns a JSON response with the result.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function.
 * @returns {Object} JSON response containing the result of the operation.
 * @throws {Error} If the user is not found or an error occurs while retrieving the analytics.
 */
const getAddressGroups = async (req, res, next) => {
    const { addressGroups } = req.$scope;
    if (!addressGroups) {
        return res.status(400).json(resUtils.badRequest('Bad Request: Address Groups not found'));
    }

    const responseBody = resUtils.success(
        message="Successfully retrieved address groups.",
        data={ addressGroups }
    );
    return res.json(responseBody);
};

module.exports = getAddressGroups;