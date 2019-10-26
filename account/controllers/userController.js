const utilities = require('../../utilities');
const user = require('../models/user');

// Func addUser, get /register
exports.addUser = function(request, response) {
    utilities.sendPugFile(
        __dirname,
        'register',
        request,
        response,
        {
            title: 'Register'
        });
};

// Func postAddUser, post /register
exports.postAddUser = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    if (request.body.passsword === '')
        return response.send('Password is empty');

    const current_user = user.addUser(
        request.body.name,
        request.body.email,
        request.body.password);

    if (current_user !== undefined)
        return utilities.sendPugFile(
            __dirname,
            'error',
            request, response,
            {
                smg: current_user,
                name_bt: 'back',
                path: '/register'
            });

    response.cookie('id', user.getUsers()[user.getUsers().length - 1].id)
        .redirect('/');
};

// Func loginUser, get /login
exports.loginUser = function(request, response) {
    utilities.sendPugFile(
        __dirname,
        'login',
        request,
        response,
        {
            title: 'Login'
        });
};

// Func postLoginUser, post /login
exports.postLoginUser = function(request, response) {
    const current_user = user.getUsers().find(o => o.email === request.body.email);

    if (current_user === undefined ||
        current_user.password !== request.body.password)
        return utilities.sendPugFile(
            __dirname,
            'error',
            request,
            response,
            {
                smg: 'Email or Password is invalid',
                name_bt: 'Back',
                path: '/login'
            });

    response.cookie('id', current_user.id);
    response.redirect('/')
};

// Func logout, get /logout
exports.logout = function(request, response) {
    response.clearCookie('id');
    response.redirect('/')
};

exports.auth = function(request, response, next) {
    const current_user = user.getUsers().find(o => o.id === request.cookies.id);

    if (current_user !== undefined) return next();
    return utilities.sendPugFile(
        __dirname,
        'error_auth',
        request,
        response,
        {
            smg: 'You are not login',
            name_bt: 'login',
            name_bt2: 'register',
            path: 'login',
            path2: 'register'
        });
};