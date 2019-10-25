const utilities = require('../../utilities');
const user = require('../models/user');

exports.addUser = function(request, response) {
    utilities.sendPugFile(
        __dirname,
        'register',
        request,
        response);
};

exports.loginUser = function(request, response) {
    utilities.sendPugFile(
        __dirname,
        'login',
        request,
        response);
};

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
                path: '/register'
            });

    response.cookie('id', user.getUsers()[user.getUsers().length - 1].id)
        .redirect('/');
};

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
                path: '/login'
            });

    response.cookie('id', current_user.id);
    response.redirect('/')
};

exports.logout = function(request, response) {
    response.clearCookie('id');
    response.redirect('/')
};