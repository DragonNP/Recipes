const api = require('../../api');
const log = require('../../logger');

module.exports = {
    getRegistration,
    getLogin,
    getMyProfile,
    logout,

    postRegistration,
    postLogin
};

function getRegistration(request, response, next) {
    log.info('userController: called getRegistration method');

    response.sendPugFile(__dirname, 'registration',
        {
            title: request.getText('Registration'),
            myProfile: request.getText('My Profile'),
            newRecipes: request.getText('New Recipes'),
            myRecipes: request.getText('My Recipes'),
            username: request.getText('Username'),
            firstName: request.getText('First Name'),
            lastName: request.getText('Last Name'),
            email: request.getText('Email'),
            password: request.getText('Password'),
            signUp: request.getText('Sign Up'),
            orYouHaveAccount: request.getText('Or you have account')
        });
}

function getLogin(request, response, next) {
    log.info('userController: called getLogin method');

    response.sendPugFile(__dirname, 'login', {
        title: request.getText('Login'),
        myProfile: request.getText('My Profile'),
        newRecipes: request.getText('New Recipes'),
        myRecipes: request.getText('My Recipes'),
        email: request.getText('Email'),
        password: request.getText('Password'),
        signIn: request.getText('Sign In'),
        orYouNotHaveAccount: request.getText('Or you not have account'),
    });
}

function getMyProfile(request, response, next) {
    log.info('userController: called getMyProfile method');

    const cookies = request.cookies;

    api.getMyProfile(cookies.token, (err, res, body) => {
        if(err) return next(err);
        if(body.message)
            return response.sendPugFile(__dirname, 'error', {
                title: request.getText('Error'),
                myProfile: request.getText('My Profile'),
                newRecipes: request.getText('New Recipes'),
                myRecipes: request.getText('My Recipes'),
                error: request.getText(body.message),
                path1: '/',
                nameBt1: 'Home',
                isVisitableTwoBt: false
            });

        response.sendPugFile(__dirname, 'myProfile', {
            title: request.getText('My Profile'),
            myProfile: request.getText('My Profile'),
            newRecipes: request.getText('New Recipes'),
            myRecipes: request.getText('My Recipes'),
            myPersonalProfile: request.getText('My Personal Profile'),
            username: body.username,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            logout: request.getText('logout')
        });
    });
}

function logout(request, response, next) {
    log.info('userController: called logout method');

    response.clearCookie('token')
        .redirect('/');
}


function postRegistration(request, response, next) {
    log.info('userController: called postRegistration method');

    const body = request.body;
    const user  = {
        username: body.username,
        email: body.email,
        password: body.password
    };

    if (body.firstName !== '') user.firstName = body.firstName;
    if (body.lastName !== '') user.lastName = body.lastName;

    api.addUser(user, (err, res, body) => {
        if (err) return next(err);
        if (body.message)
            return response.sendPugFile(__dirname, 'error', {
                title: request.getText('Error'),
                myProfile: request.getText('My Profile'),
                newRecipes: request.getText('New Recipes'),
                myRecipes: request.getText('My Recipes'),
                error: request.getText(body.message),
                path1: '/',
                nameBt1: 'Home',
                isVisitableTwoBt: false
            });

        response.cookie('token', body.token)
            .redirect('/');
    });
}

function postLogin(request, response, next) {
    log.info('userController: called postLogin method');

    const body = request.body;

    api.authenticateUser(body.email, body.password, (err, res, body) => {
        if (err) return next(err);
        if (body.message)
            return response.sendPugFile(__dirname, 'error', {
                title: request.getText('Error'),
                myProfile: request.getText('My Profile'),
                newRecipes: request.getText('New Recipes'),
                myRecipes: request.getText('My Recipes'),
                error: request.getText(body.message),
                path1: '/',
                nameBt1: 'Home',
                isVisitableTwoBt: false
            });

        response.cookie('token', body.token)
            .redirect('/');
    })
}