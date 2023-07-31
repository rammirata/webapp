const WalletData = require("../models/WalletData.model");
const utilServices = require("../utils");

const ms = 1;
const sec = 1000 * ms;
const min = 60 * sec;

const NodeCache = require("node-cache");
const { query } = require("express");
const analytics1Cache = new NodeCache({
  stdTTL: 30 * min,
  checkperiod: 10 * min,
});

const allKey = "ALL";

const get_query = (params) => {
  const { addresses } = params
  const query = addresses ? { address: { $in: addresses.split(",") } } : {}
  return query
}

const getAnalytics = async (params) => {
/*
  params: schema should be validated to include addresses: string[]
*/
  const addresses = params.addresses?.split(",")
  const query = get_query(params);
  const walletData = await WalletData.find(query);

  let finalData = walletData.map(doc => {
    return {
      address: doc.address,
      numTx: doc.numTx,
      firstTx: doc.firstTx,
      latestTx: doc.latestTx,
      longevity: doc.firstTx ? Date.now() - Number(new Date(doc.firstTx)) : null,
      // ensNames: ['test', 'charles'],
      ensNames: doc.ensNames,
      numSwaps: doc.numSwaps,
      numAirdrops: doc.numAirdrops,
      numNftTx: doc.numNftTx,
      metaverseInteractions: doc.metaverseInteractions,
      defiInteractions: doc.defiInteractions,
      gamingInteractions: doc.gamingInteractions,
      totalWorth: doc.totalWorth,
    }
  });

  // Add addressess in request with 0 transactions
  if (addresses) {
    const addresses_found_set = new Set(finalData.map(el => el.address));
    console.log(addresses)
    let addresses_zero_tx = addresses.filter(address => !addresses_found_set.has(address));
    addresses_zero_tx = addresses_zero_tx.map(address => ({
      address,
      numTx: null,
      firstTx: null,
      latestTx: null,
      longevity: null,
      ensNames: [],
      numSwaps: null,
      numAirdrops: null,
      numNftTx: null,
      metaverseInteractions: null,
      defiInteractions: null,
      gamingInteractions: null,
      totalWorth: null,
    }));
    finalData = finalData.concat(addresses_zero_tx);
  }

  return finalData;
}


module.exports = getAnalytics
