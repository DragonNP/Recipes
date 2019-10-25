const account = require('../../account');
//const recipe = require('../index');
const utilities = require('../../utilities');

exports.newRecipes = function (request, response) {
    const current_user = account.getUser().getUsers().find(o => o.id === request.cookies.id);

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
        'newRecipes',
        request,
        response,
        {
            name: current_user.name,
            items: [{
                id: 1,
                name: 'cake',
                ingredient: 'eggs, muka'
            }]
        });
};

exports.myRecipes = function (request, response) {
    const current_user = account.getUser().getUsers().find(o => o.id === request.cookies.id);

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
        'myRecipes',
        request,
        response,
        {
            name: current_user.name,
            items: [{
                id: 1,
                name: 'cake',
                ingredient: 'eggs, muka'
            }]
        })
};