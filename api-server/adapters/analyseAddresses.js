const { spawn } = require("child_process");

const workerPath = "./workers/orchestrator.js";
const language = process.env.WORKER_LANG;

const analyseAddresses = async (addresses) => {
  const child = spawn(language, [workerPath, ...addresses], {
    env: process.env,
    stdio: 'inherit'
  });

  const exitCode = await new Promise((resolve, reject) => {
    child.on("close", resolve);
  });

  if (exitCode) {
    // throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    throw new Error(`subprocess error exit ${exitCode}`);
  }
  return {
    success: !exitCode,
    data: null,
    // message: error || 'success'
    message: !exitCode ? 'success' : 'error'
  };
};

module.exports = analyseAddresses;

// analyseAddresses("0x48b742b9D935FDaeADE1A48CD7c5E4aeC4360b0c");
