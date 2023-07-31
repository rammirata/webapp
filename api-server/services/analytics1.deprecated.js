const BlockData = require("../models/BlockData.model");
const utilServices = require("../utils");

const ms = 1;
const sec = 1000 * ms;
const min = 60 * sec;

const NodeCache = require("node-cache");
const analytics1Cache = new NodeCache({
  stdTTL: 30 * min,
  checkperiod: 10 * min,
});

const allKey = "ALL";

const _getQuery = (params, mode) => {
  const query = {};

  let groupKey = "from_address";
  if (mode == "to_address") groupKey = "to_address";

  if (params.addresses) query[mode] = { $in: params.addresses.split(",") };

  return [
    {
      $match: query,
    },
    {
      $group: {
        _id: `$${groupKey}`,
        tx_hashes: {
          $addToSet: "$tx_hash",
        },
        transaction_dates: {
          $addToSet: "$transaction_date",
        },
        transacted_addresses: {
          $addToSet: "$to_address",
        },
        transacted_tokens: {
          $addToSet: "$token_type",
        },
        tx_types: {
          $push: "$tx_type",
        },
      },
    },
    {
      $project: {
        _id: 0,
        address: "$_id",
        tx_hashes: 1,
        transacted_tokens: 1,
        first_tx_date: {
          $min: "$transaction_dates",
        },
        last_tx_date: {
          $max: "$transaction_dates",
        },
        transacted_addresses: 1,
        tx_types: 1,
      },
    },
  ];
};

const makeUnique = (arr) => Array.from(new Set(arr));

const getAnalytics1 = async (params) => {
  try {
    const addresses = params.addresses.split(",");

    /********* Cache Requested Addresses *******/
    const cachedAnalytic1 = getAnalytics1Cached(params);

    const foundAddresses = cachedAnalytic1.map((el) => el.address);

    const notFoundAddresses = addresses.filter(
      (address) => !foundAddresses.includes(address)
    );

    if (cachedAnalytic1 && !notFoundAddresses.length) return cachedAnalytic1;

    const queryParams = { addresses: notFoundAddresses };
    /*****************************************/

    const getFromAddress = BlockData.aggregate(
      _getQuery(params, "from_address")
    );

    const getToAddress = BlockData.aggregate(_getQuery(params, "to_address"));

    const datas = await Promise.all([getFromAddress, getToAddress]);

    const mergedDataArrays = datas.flat();

    const mappedDatas = utilServices.collectBy(
      (d) => d.address,
      mergedDataArrays
    );

    let finalData = mappedDatas.map((d) => {
      const last_tx_date = new Date(
        Math.max(...d.map((_d) => Number(new Date(_d.last_tx_date))).flat())
      );

      const first_tx_date = new Date(
        Math.max(...d.map((_d) => Number(new Date(_d.first_tx_date))).flat())
      );

      const longevity = Date.now() - Number(first_tx_date);

      const tx_types = d
        .map((_d) => _d.tx_types.filter((v) => v == "Airdrop"))
        .flat();

      const noOfNft = d
        .map((_d) => _d.transacted_tokens)
        ?.flat(Infinity)
        ?.filter((__d) => __d === "ERC-721").length;

      return {
        address: d[0].address,
        tx_hashes: makeUnique(d.map((_d) => _d.tx_hashes).flat()),
        transacted_addresses: makeUnique(
          d.map((_d) => _d.transacted_addresses).flat()
        ),
        transacted_tokens: makeUnique(
          d.map((_d) => _d.transacted_tokens).flat()
        ),
        first_tx_date,
        last_tx_date,
        longevity,
        // tx_types: makeUnique(tx_types),
        airDropParticipation: tx_types.length,
        noOfNft,
      };
    });

    // Add addressess in request with 0 transactions
    const addresses_found_set = new Set(finalData.map(el => el.address))
    let addresses_zero_tx = addresses.filter(address => !addresses_found_set.has(address))
    addresses_zero_tx = addresses_zero_tx.map(address => ({
      address,
      tx_hashes: [],
      transacted_addresses: [],
      transacted_tokens: [],
      first_tx_date: null,
      last_tx_date: null,
      longevity: 0,
      // tx_types: makeUnique(tx_types),
      airDropParticipation: 0,
      noOfNft: []
    }))
    finalData = finalData.concat(addresses_zero_tx)

    saveAnalytics1Cached(finalData);

    return finalData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getAnalytics1Cached = (params) => {
  let keys = [];
  if (params.addresses) keys = params.addresses.split(",");
  if (keys.length) return Object.values(analytics1Cache.mget(keys));
  const allData = analytics1Cache.get(allKey);
  return Boolean(allData) ? Object.values(allData) : [];
};

const saveAnalytics1Cached = (datas, params) => {
  const notAll = params && params.address;
  if (!notAll) analytics1Cache.set(allKey, datas);
  const dataToSet = datas.map((data) => ({ key: data.address, val: data }));
  analytics1Cache.mset(dataToSet);
};

module.exports = getAnalytics1;

// (async () => {
//   const finalResponse = await getAnalytics1({
//     addresses: "0x5d6d1fe8f901726670e04c2c14a5ba625e06c7af",
//   });

//   console.log(typeof finalResponse);

//   console.log({ finalResponse });
// })();
