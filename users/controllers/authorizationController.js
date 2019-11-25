const log = require('../../logger');

module.exports = {
    auth
};

function auth(request, response, next) {
    log.info('authorizationController: called auth method');

    const cookies = request.cookies;
    const url = request.url;

    if (cookies.token |
        cookies.token !== undefined ||
        url === '/' ||
        url === '/registration' ||
        url === '/login' ||
        url === '/newRecipes' ||
        url.includes('/recipe') ||
        url.includes('/setLanguage')) {
        return next();
    }

    response.sendPugFile('error',
        {
            title: 'Error',
            error: 'You are not authorized',
            path1: '/registration',
            nameBt1: 'Sign Up',
            isVisitableTwoBt: true,
            path2: '/login',
            nameBt2: 'Sign In'
        });
}