const resUtils = require("../../utils").response;
const WaitlistService = require("../../services/Waitlist.service");
/**
 * Retrieves the details of the waitlist.
 *
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} The HTTP response body containing the waitlist details.
 * @throws {Error} If an error occurs while fetching the waitlist details.
 */
const getWaitlist = async (req, res, next) => {
    let responseBody;
    
    try {
        const waitlistDocs = await WaitlistService.get(req.body);
        responseBody = resUtils.success(
            message="Successfully fetched details of waitlist",
            data=waitlistDocs,
        );
    } catch (error) {
        responseBody = reqUtils.badRequest(error.message);
    }
    return res.json(responseBody);
}

module.exports = getWaitlist;