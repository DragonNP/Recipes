module.exports = (request, response, next) => {
    request.getText = msg => {
        return msg
    };
    next();
};