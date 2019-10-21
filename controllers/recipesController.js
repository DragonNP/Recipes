const user = require('../models/user');

exports.newRecipes = function (request, response) {
    const current_user = user.getUsers().find(o => o.id === request.cookies.id);

    if (current_user === undefined)
        return response.render('error',{
            smg: 'You are not login',
            path1: 'login',
            path2: 'register'
        });

    response.render('newRecipes', {
        name: current_user.name,
        items: [{
            id: 1,
            name: 'cake',
            ingredient: 'eggs, muka'
        }]
    });
};

exports.myRecipes = function (request, response) {
    const current_user = user.getUsers().find(o => o.id === request.cookies.id);

    response.render('myRecipes', {
        name: current_user.name,
        items: [{
            id: 1,
            name: 'cake',
            ingredient: 'eggs, muka'
        }]
    })
};