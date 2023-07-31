const { connect_db } = require('../utils/db');
const { invokeLambda } = require('../utils/aws');
const WalletData = require("../models/WalletData.model");
const ApiKeys = require("../models/ApiKeys.model");
const WalletDataService = require("../services/WalletData.service");
const WalletTokensService = require("../services/WalletTokens.service");

// Errors that shouldnt be checked and updated again
// Also include Malformed addresses, and use error codes for better indexing / search
const ERROR_EMPTY_RES = "Response payload empty";

const lambdaConcurrency = process.env.AWS_LAMBDA_CONCURRENCY;
const apiKeysRate = process.env.COVALENT_API_KEYS_RATE;
const lambdaName = process.env.LAMBDA_FN_NAME;
const batchSize = process.env.LAMBDA_DB_BATCH_SIZE;


const getQuery = () => {
    // Query for just queued wallets
    const query = { status: 'queued' };
    
    // Query for queued and error wallets
    // const query = { 
    //     $or: [{ status: 'queued'}, {status: 'error'}],
    //     errorMsg: { $ne: ERROR_EMPTY_RES }
    // };
    return query;
}

const main = async () => {
    await connect_db();
    let queuedWallets = process.argv.slice(2);

    if (queuedWallets.length <= 0) {
        // Get all walletDatas with status Queued
        const query = getQuery();
        const walletData = await WalletData.find(query).select('address');
        queuedWallets = walletData.map(doc => doc.address);
    }
    
    console.log('queuedWallets: ', queuedWallets.length)
    if (queuedWallets.length == 0) return;
    
    // Get all apiKeys from DB
    const apiKeys = (
        await ApiKeys.find({}).select('key').limit(queuedWallets.length)
    ).map(doc => doc.key);
    console.log('apiKeys: ', apiKeys.length);
    
    // Throttle calls to lambda fns and rotate keys
    const walletUpdateThrottle = new Throttle(
        apiKeys, queuedWallets, lambdaConcurrency, apiKeysRate, lambdaName, batchSize);
    const walletUpdates = await walletUpdateThrottle.throttleAll();

    // Prepare wallet updates
    // console.log('updates: ', walletUpdates);
    const [walletMetrics, walletBalances, addressFilter] = mapWalletUpdates(walletUpdates);
    
    // Save wallet updates in DB in bulk
    // Think of using transaction in the future to save both data points in conjunction
    const walletBulkUpsertRes = await WalletDataService.bulkUpdate(addressFilter, walletMetrics, upsert=true);
    const walletToksBulkUpsertRes = await WalletTokensService.bulkUpdate(addressFilter, walletBalances, upsert = true);

    console.log('Orchestrator updated wallet datas succesfully.');
    return Promise.resolve();
}

const mapWalletUpdates = (walletUpdates) => {
    // get wallet address query
    const addressFilter = [];
    const walletMetrics = [];
    const walletBalances = [];
    walletUpdates.forEach((walletUpdate, i) => {
        addressFilter[i] = { address: walletUpdate.metrics.address };

        walletMetrics[i] = walletUpdate.metrics;
        walletMetrics[i]['status'] = walletMetrics[i]['status'] || 'success';
        walletMetrics[i]['errorMsg'] = walletMetrics[i]['errorMsg'] || null;
        walletMetrics[i]['updatedAt'] = new Date();

        walletBalances[i] = walletUpdate.balances;
        walletBalances[i]['updatedAt'] = new Date();
    });

    return [walletMetrics, walletBalances, addressFilter];
}

class Throttle {
    constructor(apiKeys, wallets, concurrency, apiKeysRate, lambdaName, batchSize) {
        this.apiKeys = apiKeys;
        this.queuedWallets = wallets;
        this.maxConcurrency = concurrency;
        this.apiKeysRate = apiKeysRate;
        this.lambdaName = lambdaName;
        this.apiKeyCalls = {}
        apiKeys.forEach(key => { this.apiKeyCalls[key] = 0 });
        this.currentConcurrency = 0;
        this.results = []
        this.batchSize = batchSize
        this.apiCalls = 0;
        this.TIMEOUT_MS = 1100;
    }

    async throttleAll() {
        const allCalls = this.apiKeys.map(key => this.throttleCallsPerKey(key));
        const allCallsRes = await Promise.all(allCalls);
        console.log('apiCalls: ', this.apiCalls)
        return this.results;
    }

    async throttleCallsPerKey(apiKey) {
        // console.log('key: ', apiKey)
        let i = 0;
        const keyCalls = []
        while (this.queuedWallets.length > 0) {
            for (let i = 0; i < this.apiKeysRate; i++) {
                keyCalls.push(this.sendNext(apiKey))
            }
            await timeout(this.TIMEOUT_MS)
        }
        return Promise.all(keyCalls)
    }

    async sendNext(apiKey) {
        // Improvement: concurrency may free up before apiKey and fn stops using apikey limit if concurrency has been reached - handle this case
        if (this.currentConcurrency < this.maxConcurrency
            // && this.apiKeyCalls[apiKey] < this.apiKeysRate
            && this.queuedWallets.length > 0) {

                // Reserve wallet address and api keys for next call
                const nextWallet = this.queuedWallets.pop();
                this.currentConcurrency++;

                // Make call to lambda fn and store result
                try {
                    let res = JSON.parse(await this.invoke(apiKey, nextWallet));
                    // console.log('res: ', res)

                    // Handle wallets with empty data -> set status to empty
                    if (Object.keys(res).length === 0) {
                        // throw new Error("Response payload empty");
                        res = [{
                            metrics: { address: nextWallet, status: 'empty' },
                            balances: {}
                        }];
                    }

                    if (res.error_message) throw new Error(res.error_message)
                    this.results.push(...res);
                } catch (err) {
                    console.error('Error invoking lamba fn: ', {address: nextWallet, err});
                    this.results.push({
                        metrics: { address: nextWallet, status: 'error', errorMsg: err.message },
                        balances: {}
                    });
                }
                    
                // Reduce current concurrency
                this.currentConcurrency--;

                // if results over batchSize, upsert results to DB
                // console.log('length: ', this.results.length)
                console.log('apiCalls: ', this.apiCalls)
                if (this.results.length >= this.batchSize) {
                    const results = this.results;
                    try {
                        console.log('storing results: ', this.results.length)
                        const [walletBulkUpsertRes, walletToksBulkUpsertRes] = await this.storeResults()
                    } catch (err) {
                        const walletsToStore = results.map(wallet => wallet.metrics.address)
                        console.error('Error storing wallet updates: ', { addresses: walletsToStore, err });
                        // Push results back to list to retry again.
                        this.results.push(...results);
                    }
                }

                return true;
        }
        return true;
    }

    async storeResults() {
        // Get wallet update schemas and resett results
        const [walletMetrics, walletBalances, addressFilter] = mapWalletUpdates(this.results);
        this.results = [];
        // console.log('storing results: ', [walletMetrics, walletBalances, addressFilter])

        const walletBulkUpsertRes = await WalletDataService.bulkUpdate(addressFilter, walletMetrics, true);
        const walletToksBulkUpsertRes = await WalletTokensService.bulkUpdate(addressFilter, walletBalances, true);

        return [walletBulkUpsertRes, walletToksBulkUpsertRes]
    }

    // Need to handle errors from invocation
    async invoke(apiKey, wallet) {
        const payload = {
            '_addresses': [wallet],
            'api_key': apiKey
        };
        // console.log('payload: ', payload)
        const res = await invokeLambda(this.lambdaName, payload);
        this.apiCalls++;
        const resPayload = JSON.parse(res.Payload);
        // console.log('resPayload Address: ', wallet);
        // console.log('res: ', res)
        // console.log('resPayload: ', resPayload);
        // if (resPayload.hasOwnProperty('errorMessage')) throw new Error(resPayload.errorMessage)
        if (typeof resPayload !== 'string' || !resPayload instanceof String) throw new Error(resPayload.errorMessage)
        return resPayload;
    }
}

timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main()
.then(() => {
    console.log('end'); process.exit(0)
})
.catch(e => {
    console.error(e); process.exit(1)
});
