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
    const cookies = request.cookies;
    const json = {
        token: cookies.token
    };

    api.myProfile(json, (err, res, body) => {
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
    response.clearCookie('token')
        .redirect('/');
}

function postRegistration(request, response, next) {
    const body = request.body;
    const json = {
        username: body.username,
        email: body.email,
        password: body.password
    };

    if (body.firstName !== '') json.firstName = body.firstName;
    if (body.lastName !== '') json.lastName = body.lastName;

    api.addUser(json, (err, res, body) => {
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
    const body = request.body;
    const json = {
        email: body.email,
        password: body.password
    };

    api.authenticateUser(json, (err, res, body) => {
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