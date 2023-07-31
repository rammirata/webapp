const mapAddressGroupData = (addressDataList) => {
    const addressAnalytics = addressDataList.map(doc => {
        return {
            address: doc.address,
            numTx: doc.numTx,
            firstTx: doc.firstTx,
            latestTx: doc.latestTx,
            longevity: doc.firstTx ? Date.now() - Number(new Date(doc.firstTx)) : null,
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
    return addressAnalytics;
}


module.exports = {
    mapAddressGroupData
}
