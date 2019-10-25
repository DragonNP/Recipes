const user = require('../models/user');
const utilities = require('../../utilities');

exports.myProfile = function (request, response) {
    const current_user = user.getUsers().find(o => o.id === request.cookies.id);

    if (current_user === undefined)
        return utilities.sendPugFile(
            __dirname,
            'error',
            request,
            response,
            {
                smg: 'You are not login',
                path1: 'login',
                path2: 'register'
        });

    utilities.sendPugFile(
        __dirname,
        'myProfile',
        request,
        response,
        {
            name: current_user.name,
            email: current_user.email,
            password: current_user.password
        })
};