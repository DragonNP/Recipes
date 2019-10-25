const account = require('../../account');
const recipe = require('../models/recipe');
const utilities = require('../../utilities');

// Func newRecipes, get /newRecipes
exports.newRecipes = function (request, response) {
    const current_user = account.getUser().find(o => o.id === request.cookies.id);

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
            items: recipe.getRecipes()
        });
};

// Func myRecipes, get /myRecipes
exports.myRecipes = function (request, response) {
    const current_user = account.getUser().find(o => o.id === request.cookies.id);

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
            items: recipe.getRecipes().filter(function (value) {
                return value.account_id === request.cookies.id;
            })
        })
};

// Func recipe, get /recipe
exports.recipe = function (request, response){
    const current_user = account.getUser().find(o => o.id === request.cookies.id);

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
        'recipe',
        request,
        response,
        {
            name: current_user.name,
            item: recipe.getRecipes().find(o => o.recipe_id === request.query.id)
        })
};

// Func addRecipe, get /addRecipe
exports.addRecipe = function (request, response) {
    const current_user = account.getUser().find(o => o.id === request.cookies.id);

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
        'addRecipe',
        request,
        response,
        {
            name: current_user.name
        })
};
// Func addRecipe, post /addRecipe
exports.postAddRecipe = function (request, response) {
    if (!request.body) return response.sendStatus(400);

    const current_user = recipe.addRecipe(
        request.body.path_img,
        request.body.name,
        request.body.description,
        request.body.ingredients,
        request.body.instruction,
        new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        request.cookies.id,
        function(err, date){
            if(!err) return;
            return utilities.sendPugFile(
                __dirname,
                'error',
                request, response,
                {
                    smg: current_user,
                    path: '/register'
                });
        });

    response.redirect('/');
};