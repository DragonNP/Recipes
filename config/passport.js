const log = require('../logger');

module.exports = {
    isAuthenticated
};

function isAuthenticated(request, response, next) {
    log.info('passport: called isAuthenticated method');

    const cookies = request.cookies;

    if (cookies.token || cookies.token !== undefined)
        return next();

    response.redirect('/login');
}