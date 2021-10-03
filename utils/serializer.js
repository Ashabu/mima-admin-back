module.exports = (status, data, success = true, errorMessage = null, locale = 'en') => {
    return {
        status,
        data,
        success,
        errorMessage,
        locale
    };
};