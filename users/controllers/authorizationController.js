const log = require('../../logger');
const translator = require('../../translator');

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
        url === '/newRecipes')
        return next();

    response.sendPugFile('error',
        {
            title: translator.text('Error'),
            error: translator.text('You are not authorized'),
            path1: '/registration',
            nameBt1: translator.text('Sign Up'),
            isVisitableTwoBt: true,
            path2: '/login',
            nameBt2: translator.text('Sign In')
        });
}