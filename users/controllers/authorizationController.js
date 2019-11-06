const log = require('../../logger');
const translation = require('../../translation');

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

    response.sendPugFile(__dirname, 'error',
        {
            title: translation.text('Error'),
            myProfile: translation.text('My Profile'),
            newRecipes: translation.text('New Recipes'),
            myRecipes: translation.text('My Recipes'),
            error: translation.text('You are not authorized'),
            path1: translation.text('/registration'),
            nameBt1: translation.text('Sign Up'),
            isVisitableTwoBt: true,
            path2: translation.text('/login'),
            nameBt2: translation.text('Sign In')
        });
}