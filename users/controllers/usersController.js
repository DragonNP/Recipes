const api = require('../../api');
const log = require('../../logger');
const translation = require('../../translation');

const error_options = {
    title: translation.text('Error'),
    myProfile: translation.text('My Profile'),
    newRecipes: translation.text('New Recipes'),
    myRecipes: translation.text('My Recipes'),
    path1: '/',
    nameBt1: 'Home',
    isVisitableTwoBt: false
};

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
            title: translation.text('Registration'),
            myProfile: translation.text('My Profile'),
            newRecipes: translation.text('New Recipes'),
            myRecipes: translation.text('My Recipes'),
            username: translation.text('Username'),
            firstName: translation.text('First Name'),
            lastName: translation.text('Last Name'),
            email: translation.text('Email'),
            password: translation.text('Password'),
            signUp: translation.text('Sign Up'),
            orYouHaveAccount: translation.text('Or you have account')
        });
}

function getLogin(request, response, next) {
    log.info('userController: called getLogin method');

    response.sendPugFile(__dirname, 'login', {
        title: translation.text('Login'),
        myProfile: translation.text('My Profile'),
        newRecipes: translation.text('New Recipes'),
        myRecipes: translation.text('My Recipes'),
        email: translation.text('Email'),
        password: translation.text('Password'),
        signIn: translation.text('Sign In'),
        orYouNotHaveAccount: translation.text('Or you not have account'),
    });
}

function getMyProfile(request, response, next) {
    log.info('userController: called getMyProfile method');

    const cookies = request.cookies;

    api.getMyProfile(cookies.token, (err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(body.message || err);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        response.sendPugFile(__dirname, 'myProfile', {
            title: translation.text('My Profile'),
            myProfile: translation.text('My Profile'),
            newRecipes: translation.text('New Recipes'),
            myRecipes: translation.text('My Recipes'),
            myPersonalProfile: translation.text('My Personal Profile'),
            username: body.username,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            logout: translation.text('logout')
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
        if (err || body.message) {
            error_options.error = translation.text(body.message || err);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        response.cookie('token', body.token)
            .redirect('/');
    });
}

function postLogin(request, response, next) {
    log.info('userController: called postLogin method');

    const body = request.body;

    api.authenticateUser(body.email, body.password, (err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(body.message || err);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        response.cookie('token', body.token)
            .redirect('/');
    })
}