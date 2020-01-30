const log = require('../logger');

module.exports = {
    isAuthenticated
};

function isAuthenticated(request, response, next) {
    log.debug('Passport: called isAuthenticated method');

    const cookies = request.cookies;

    if (cookies.token || cookies.token !== undefined)
        return next();

    response.redirect('/login');
}