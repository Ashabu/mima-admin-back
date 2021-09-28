module.exports = (status, data, succes = true, errorMessage = null, locale = 'en') => {
    return {
        status,
        data,
        succes,
        errorMessage,
        locale
    };
};