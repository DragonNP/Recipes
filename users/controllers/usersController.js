const api = require('../../api');
const log = require('../../logger');
const translation = require('../../translation');

const error_options = {
    title: translation.text('Error'),
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

async function getRegistration(request, response, next) {
    log.info('userController: called getRegistration method');

    response.sendPugFile(__dirname, 'registration',
        {
            title: translation.text('Registration'),
            username: translation.text('Username'),
            email: translation.text('Email'),
            password: translation.text('Password'),
            signUp: translation.text('Sign Up'),
            orYouHaveAccount: translation.text('Or you have account')
        });
}

async function getLogin(request, response, next) {
    log.info('userController: called getLogin method');

    response.sendPugFile(__dirname, 'login', {
        title: translation.text('Login'),
        email: translation.text('Email'),
        password: translation.text('Password'),
        signIn: translation.text('Sign In'),
        orYouNotHaveAccount: translation.text('Or you not have account'),
    });
}

async function getMyProfile(request, response, next) {
    log.info('userController: called getMyProfile method');

    const cookies = request.cookies;

    api.getMyProfile(cookies.token, (err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(body.message || err);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        response.sendPugFile(__dirname, 'myProfile', {
            username: body.username,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,

            edit: translation.text('edit'),
            logout: translation.text('logout')
        });
    });
}

async function logout(request, response, next) {
    log.info('userController: called logout method');

    response.clearCookie('token')
        .redirect('/');
}


async function postRegistration(request, response, next) {
    log.info('userController: called postRegistration method');

    const body = request.body;
    const user  = {
        username: body.username,
        email: body.email,
        password: body.password
    };

    api.addUser(user, (err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(body.message || err);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        response.cookie('token', body.token)
            .redirect('/');
    });
}

async function postLogin(request, response, next) {
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