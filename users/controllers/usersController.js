const api = require('../../api');
const log = require('../../logger');

module.exports = {
    getRegistration,
    getLogin,
    getMyProfile,
    logout,
    setLanguage,

    postRegistration,
    postLogin,
    postUpdateProfile
};

async function getRegistration(request, response) {
    log.debug('UserController: called getRegistration method');

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
            already_have_account: 'Already have account'
        });
}

async function getLogin(request, response) {
    log.debug('UserController: called getLogin method');

    response.sendPugFile('usersPages/login', {
        title: 'Login',
        email: 'Email',
        enter_your_email: 'Enter your email',
        password: 'Password',
        enter_your_password: 'Enter your password',
        remember_me: 'Remember me',
        dont_have_an_account: 'Don\'t have an account',
    });
}

async function getMyProfile(request, response, next) {
    log.debug('UserController: called getMyProfile method');

    const cookies = request.cookies;

    api.getMyProfile(cookies.token, (err, res, body) => {
        if (err || body.message) {
            log.err(err || body.message);
            return next();
        }

        response.myProfile = body;
        const username = body.username;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const email = body.email;

        api.getRecipesByAccountId(body._id, (err, res, body) => {
            if (err || body.message) {
                log.err(err || body.message);
                return next();
            }

            response.sendPugFile( 'usersPages/myProfile', {
                title: 'My Profile',
                about_me: 'About me',
                email: 'Email',
                recipes: 'Recipes',
                name: 'Name',
                date_of_publication: 'Date of publication',
                personal_info: 'Personal Info',
                first_name: 'First Name',
                enter_first_name: 'Enter first name',
                last_name: 'Last Name',
                enter_last_name: 'Enter last name',
                enter_your_email: 'Enter your email',
                password: 'Password',
                enter_your_password: 'Enter your password',
                enter_username: 'Enter username',
                username_label: 'Username',
                save: 'Save',
                username_person: username,
                firstName_person: firstName,
                lastName_person: lastName,
                recipes_person: body,
                email_person: email,
            });
        });
    });
}

async function logout(request, response) {
    log.debug('UserController: called logout method');

    response.clearCookie('token')
        .sendPugFile('usersPages/logout', {
        title: 'logout',
        back_to_home: 'Back to Home',
        see_you_again: 'See you again',
        you_are_now_successfully_sign_out: 'You are now successfully sign out'
    });
}

async function setLanguage(request, response) {
    log.debug('UserController: called setLanguage method');

    response.cookie('lang', request.query.lang)
        .redirect('/');
}

async function postRegistration(request, response, next) {
    log.debug('UserController: called postRegistration method');

    const body = request.body;
    const user  = {
        username: body.username,
        email: body.email,
        password: body.password
    };

    api.addUser(user, (err, res, body) => {
        if (err || body.message) {
            log.err(err || body.message);
            return next();
        }

        response.cookie('token', body.token)
            .redirect('/');
    });
}

async function postLogin(request, response, next) {
    log.debug('UserController: called postLogin method');
    const body = request.body;

    api.authenticateUser(body.email, body.password, (err, res, body) => {
        if (err || body.message) {
            log.err(err || body.message);
            return next();
        }

        response.cookie('token', body.token)
            .redirect('/');
    })
}

async function postUpdateProfile(request, response, next) {
    log.debug('UserController: called postUpdateProfile method');
    const body = request.body;
    const token = request.cookies.token;
    const updatedUser = {
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email
    };

    if (body.password && body.password !== '')
        updatedUser.password = body.password;

    api.updateUser(token, updatedUser, (err, res, body) => {
        if (err || body.message) {
            log.err(err || body.message);
            return next();
        }
        response.redirect('/myProfile');
    })
}