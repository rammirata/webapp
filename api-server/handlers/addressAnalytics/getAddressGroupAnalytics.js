const mapAddressGroupData = require("../../services/analytics.service").mapAddressGroupData;
const resUtils = require("../../utils").response;
const WalletData = require("../../models/WalletData.model");

/**
 * Handler function that retrieves analytics data based on addressListData in scope.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Object} Express response object with JSON payload.
 */
const getAddressGroupAnalytics = async (req, res, next) => {
    const { filters } = req.$scope;
    const { page, limit } = req.query;
    let filteredData;

    // Return all filtered data if no pagination provided
    if (page) {
        const pageNum = parseInt(page, 10) || 1; 
        const itemsPerPage = parseInt(limit, 10) || 100;
        const skip = (pageNum - 1) * itemsPerPage;
        filteredData = await WalletData
        .find(filters)
        .skip(skip)
        .limit(itemsPerPage);
    } else {
        filteredData = await WalletData
        .find(filters);
    }
  
    const addressGroupAnalytics = mapAddressGroupData(filteredData);
    
    const responseBody = resUtils.success(
      message="Successfully fetched analytics data",
      data = { addressGroupAnalytics }
    );
  
    return res.json(responseBody);
  };

module.exports = getAddressGroupAnalytics;