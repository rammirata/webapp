const cron = require('node-cron');
const analyseAddresses = require("./adapters/analyseAddresses");

const BLOCK_UPDATES_ENABLED = process.env.BLOCK_UPDATES_ENABLED == 'true';

const scheduleJobs = () => {
    // Only run in one server - when moving to multi-server arch => use bull
    cron.schedule('0 1 * * *', async () => {
        console.log('Running analyze address orchestrator job every 24 hours');
        try {
            const { success, data, message } = await analyseAddresses([]);
            if (success) {
                console.log('Successfully ran address orchestrator job')
            } else {
                console.error('Error running address orchestrator job: ' + message)
            }
        } catch (err) {
            console.error('Error running address orchestrator job: ', err)
        }
    });
    if (BLOCK_UPDATES_ENABLED) {
        cron.schedule('*/10 * * * *', async () => {
            console.log('Running ETH block updates job every 10 min');
            try {
                const { success, data, message } = await analyseAddresses([]);
                if (success) {
                    console.log('Successfully ran ETH block updates job')
                } else {
                    console.error('Error running ETH block updates job: ' + message)
                }
            } catch (err) {
                console.error('Error running ETH block updates job: ', err)
            }
        });
    }
    console.log('Cron jobs scheduled');
}

module.exports = scheduleJobs;
