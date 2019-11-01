const log = require('../../logger');

module.exports = {
    auth
};

function auth(request, response, next) {
    log.info('authorizationController: called auth method');

    const cookies = request.cookies;

    if (request.url === '/registration' ||
        request.url === '/login' ||
        request.url === '/newRecipes')
        return next();
    if(cookies.token) return next();

    response.sendPugFile(__dirname, 'error',
        {
            title: request.getText('Error'),
            myProfile: request.getText('My Profile'),
            newRecipes: request.getText('New Recipes'),
            myRecipes: request.getText('My Recipes'),
            error: request.getText('You are not authorized'),
            path1: request.getText('/registration'),
            nameBt1: request.getText('Sign Up'),
            path2: request.getText('/login'),
            nameBt2: request.getText('Sign In')
        });
}