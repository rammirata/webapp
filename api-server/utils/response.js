
const validationError = (validationErrors) => {
    return badRequest(validationErrors[0].msg);
};

const badRequest = (errorMessage) => {
    return error(errorMessage,400);
}

const error = (errorMessage=null, httpCode=500) => {
    return {
        status: 'ERROR',
        status_code: 102,
        status_message: errorMessage,
        http_code: httpCode
    };
}

const success = (message=null, data=null, httpCode=200) => {
    return {
        status: 'SUCCESS',
        status_code: 0,
        status_message: message,
        http_code: httpCode,
        data: data
    }
}


module.exports = {
    validationError,
    badRequest,
    success,
    error
}
