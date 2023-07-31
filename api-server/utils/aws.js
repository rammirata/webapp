const AWS = require('../config/aws');

const invokeLambda = async (functionName, payload) => {
    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: functionName,
        InvocationType: "RequestResponse",
        Payload: JSON.stringify(payload)
    };
    return await lambda.invoke(params).promise();
}

module.exports = {
    invokeLambda
}
