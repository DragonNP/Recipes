const api = require('../../api');
const log = require('../../logger');

module.exports = {
    auth
};

function auth(request, response, next) {
    log.info('authorizationController: called auth method');

    const cookies = request.cookies;
    const url = request.url;

    if (cookies.token && !cookies.account_id)
         return api.getMyProfile(cookies.token, (err, res, body) => {
            response.cookie('account_id', body._id).redirect('/');
        });

    if (cookies.token |
        cookies.token !== undefined ||
        url === '/' ||
        url === '/registration' ||
        url === '/login' ||
        url === '/newRecipes')
        return next();

    response.sendPugFile(__dirname, 'error',
        {
            title: request.getText('Error'),
            myProfile: request.getText('My Profile'),
            newRecipes: request.getText('New Recipes'),
            myRecipes: request.getText('My Recipes'),
            error: request.getText('You are not authorized'),
            path1: request.getText('/registration'),
            nameBt1: request.getText('Sign Up'),
            isVisitableTwoBt: true,
            path2: request.getText('/login'),
            nameBt2: request.getText('Sign In')
        });
}