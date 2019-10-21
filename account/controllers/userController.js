const path = require('path');
const pug = require('pug');
const user = require('../../models/user');

exports.addUser = function(request, response) {
    sendPugFile('register', request, response);
};

exports.loginUser = function(request, response) {
    sendPugFile('login', request, response);
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
        return sendPugFile('error', request, response,
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
        return sendPugFile('error', request, response,
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

function sendPugFile(filename, request, response, options) {
    if (typeof options === 'undefined') {
        pug.renderFile(
            path.join(__dirname, '..\\views\\', filename + '.pug'),
            {},
            function (err, data) {
                if (err !== null) {
                    response.sendStatus(500);
                    return console.log(err);
                } else
                    return response.send(data)
            })
    }

    pug.renderFile(
        path.join(__dirname, '..\\views\\', filename + '.pug'),
        options,
        function (err, data) {
            if (err !== null) {
                response.sendStatus(500);
                return console.log(err);
            } else
                return response.send(data)
        })
}