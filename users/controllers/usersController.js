const api = require('../../api');
const log = require('../../logger');

const error_options = {
    title: 'Error',
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
            title: 'Registration',
            username: 'Username',
            email: 'Email',
            password: 'Password',
            signUp: 'Sign Up',
            orYouHaveAccount: 'Or you have account'
        });
}

async function getLogin(request, response, next) {
    log.info('userController: called getLogin method');

    response.sendPugFile(__dirname, 'login', {
        title: 'Login',
        email: 'Email',
        password: 'Password',
        signIn: 'Sign In',
        orYouNotHaveAccount: 'Or you not have account',
    });
}

async function getMyProfile(request, response, next) {
    log.info('userController: called getMyProfile method');

    const cookies = request.cookies;

    api.getMyProfile(cookies.token, (err, res, body) => {
        if (err || body.message) {
            error_options.error = body.message || err;
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        response.sendPugFile(__dirname, 'myProfile', {
            username: body.username,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,

            edit: 'edit',
            logout: 'logout'
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
            error_options.error = body.message || err;
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
            error_options.error = body.message || err;
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        response.cookie('token', body.token)
            .redirect('/');
    })
}