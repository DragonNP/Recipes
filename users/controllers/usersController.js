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
    setLanguage,

    postRegistration,
    postLogin
};

async function getRegistration(request, response, next) {
    log.info('userController: called getRegistration method');

    response.sendPugFile( 'usersPages/registration',
        {
            title: 'Registration',
            dont_have_an_account: 'Don\'t have an account',
            create_your_own_account_it_takes_less_than_a_minute: 'Create your own account, it takes less than a minute',

            username: 'Username',
            enter_username: 'Enter username',

            email: 'Email',
            enter_your_email: 'Enter your email',

            password: 'Password',
            enter_your_password: 'Enter your password',

            sign_up: 'Sign Up',
            sign_in: 'Sign In',
            already_have_account: 'Already have account'
        });
}

async function getLogin(request, response, next) {
    log.info('userController: called getLogin method');

    response.sendPugFile('usersPages/login', {
        title: 'Login',

        email: 'Email',
        enter_your_email: 'Enter your email',

        password: 'Password',
        enter_your_password: 'Enter your password',

        remember_me: 'Remember me',
        sign_up: 'Sign Up',
        sign_in: 'Sign In',
        dont_have_an_account: 'Don\'t have an account',
    });
}

async function getMyProfile(request, response, next) {
    log.info('userController: called getMyProfile method');

    const cookies = request.cookies;

    api.getMyProfile(cookies.token, (err, res, body) => {
        if (err || body.message) {
            error_options.error = body.message || err;
            return response.sendPugFile('error', error_options);
        }

        response.sendPugFile( 'usersPages/myProfile', {
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
        .sendPugFile('usersPages/logout', {
        title: 'logout',
    });
}

async function setLanguage(request, response, next) {
    log.info('userController: called setLanguage method');

    response.cookie('lang', request.query.lang)
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
            return response.sendPugFile('error', error_options);
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
            return response.sendPugFile('error', error_options);
        }

        response.cookie('token', body.token)
            .redirect('/');
    })
}