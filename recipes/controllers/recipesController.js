const api = require('../../api');
const log = require('../../logger');
const translation = require('../../translation');

const error_options = {
    title: translation.text('Error'),
    myProfile: translation.text('My Profile'),
    newRecipes: translation.text('New Recipes'),
    myRecipes: translation.text('My Recipes'),
    path1: '/',
    nameBt1: 'Home',
    isVisitableTwoBt: false
};

module.exports = {
    newRecipes,
    myRecipes
};

function newRecipes(request, response, next) {
    log.info('recipesController: called newRecipes method');

    api.getRecipes((err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(body.message || err);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const options = {
            title: translation.text('New Recipes'),
            myProfile: translation.text('My profile'),
            newRecipes: translation.text('New recipes'),
            myRecipes: translation.text('My recipes'),
            image: translation.text('Image'),
            name: translation.text('Name'),
            description: translation.text('Description'),
            ingredients: translation.text('Ingredients'),
            recipes: body,
            goTo: translation.text('Go To'),
        };
        response.sendPugFile(__dirname, 'newRecipes', options);
    });
}

function myRecipes(request, response, next) {
    log.info('recipesController: called myRecipes method');

    const cookies = request.cookies;

    api.getMyRecipes(cookies.token, (err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(body.message || err);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const options = {
            title: translation.text('My Recipes'),
            myProfile: translation.text('My profile'),
            newRecipes: translation.text('New recipes'),
            myRecipes: translation.text('My recipes'),
            image: translation.text('Image'),
            name: translation.text('Name'),
            description: translation.text('Description'),
            ingredients: translation.text('Ingredients'),
            recipes: body,
            goTo: translation.text('Go To'),
            addRecipe: translation.text('Add Recipe'),
        };

        response.sendPugFile(__dirname, 'myRecipes', options);
    });
}