const { connect_db } = require('../utils/db');
const { invokeLambda } = require('../utils/aws');
const WalletData = require('../models/WalletData.model');
const ChainData = require('../models/ChainData.model');
const ApiKeys = require('../models/ApiKeys.model');
const WalletDataService = require('../services/WalletData.service');
const ChainDataService = require('../services/ChainData.service');
const sliceToChunks = require('../utils/sliceToChunks');

const BATCHSIZE = 100;
const lambdaName = 'transactedInBlock';

const mapWalletUpdates = (walletAddreses) => {
    // get wallet address query
    const addressFilter = [];
    const queuedWallets = [];
    walletAddreses.forEach((address, i) => {
        addressFilter[i] = { address };
        queuedWallets[i] = { status: 'queued', updatedAt: new Date() };
    });

    return [queuedWallets, addressFilter];
}

const main = async () => {
    await connect_db();

    // get the latest block from chain
    const query = { name: 'Ethereum' }; // Temporary name -> change to param when more than one chain available
    const chainData = await ChainData.findOne(query).select('lastBlockUpdated');
    if (!chainData || !chainData.lastBlockUpdated) throw new Error('Chain Data does not have valid lastBlockUpdated');

    // invoke lambda fn with block
    const payload = {
        startBlockNumber: chainData.lastBlockUpdated
    };
    const res = await invokeLambda(lambdaName, payload);
    const resPayload = JSON.parse(res.Payload);
    if (resPayload.errorMessage) throw new Error(resPayload.errorMessage)
    console.log('resPayload: ', Object.keys(resPayload));
    
    // get batches of addresses together
    const { address, lastBlock } = resPayload;
    // const walletUpdates = address.map(address => ([
        //     { address },
        //     { status: 'queued', updatedAt: new Date()}
        // ]));
        const addressBatches = sliceToChunks(address, BATCHSIZE);
        
        // update all addresses and set as 'queued'
    const allUpdateCalls = addressBatches.map(batch => {
        const [queuedWallets, addressFilter] = mapWalletUpdates(batch);
        return WalletDataService.bulkUpdate(addressFilter, queuedWallets, true);
    });
    const allCallsRes = await Promise.all(allUpdateCalls);
    console.log('Total wallets queued: ', address.length);
    
    // update chain data with the last block
    chainData.lastBlockUpdated = lastBlock;
    const chainDataUpdate = await chainData.save();
}

main()
.then(() => {
    console.log('end'); process.exit(0)
})
.catch(e => {
    console.error(e); process.exit(1)
});
