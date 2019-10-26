const user = require('../models/user');
const utilities = require('../../utilities');

// Func myProfile, get /myProfile
exports.myProfile = function (request, response) {
    const current_user = user.getUsers().find(o => o.id === request.cookies.id);

    utilities.sendPugFile(
        __dirname,
        'myProfile',
        request,
        response,
        {
            title: 'My Profile',
            name: current_user.name,
            email: current_user.email,
            password: current_user.password
        })
};