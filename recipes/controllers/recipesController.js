const api = require('../../api');
const log = require('../../logger');

module.exports = {
    newRecipes,
    myRecipes
};

function newRecipes(request, response, next) {
    log.info('recipesController: called newRecipes method');

    api.getRecipes((err, res, body) => {
        if (err) log.err(err);
        if (body.message) {
            const options = {
                title: request.getText('Error'),
                myProfile: request.getText('My Profile'),
                newRecipes: request.getText('New Recipes'),
                myRecipes: request.getText('My Recipes'),
                error: request.getText(body.message),
                path1: '/',
                nameBt1: 'Home',
                isVisitableTwoBt: false
            };
            return response.sendPugFile(__dirname, 'error', options);
        }

        const options = {
            title: request.getText('New Recipes'),
            myProfile: request.getText('My profile'),
            newRecipes: request.getText('New recipes'),
            myRecipes: request.getText('My recipes'),
            image: request.getText('Image'),
            name: request.getText('Name'),
            description: request.getText('Description'),
            ingredients: request.getText('Ingredients'),
            recipes: body,
            goTo: request.getText('Go To'),
        };
        response.sendPugFile(__dirname, 'newRecipes', options);
    });
}

function myRecipes(request, response, next) {
    log.info('recipesController: called myRecipes method');

    const cookies = request.cookies;

    api.getMyRecipes(cookies.token, (err, res, body) => {
        if (err) log.err(err);
        if (body.message)
            return response.sendPugFile(__dirname, 'error', {
                title: request.getText('Error'),
                myProfile: request.getText('My Profile'),
                newRecipes: request.getText('New Recipes'),
                myRecipes: request.getText('My Recipes'),
                error: request.getText(body.message),
                path1: '/',
                nameBt1: 'Home',
                isVisitableTwoBt: false
            });

        const options = {
            title: request.getText('My Recipes'),
            myProfile: request.getText('My profile'),
            newRecipes: request.getText('New recipes'),
            myRecipes: request.getText('My recipes'),
            image: request.getText('Image'),
            name: request.getText('Name'),
            description: request.getText('Description'),
            ingredients: request.getText('Ingredients'),
            recipes: body,
            goTo: request.getText('Go To'),
            addRecipe: request.getText('Add Recipe'),
        };

        response.sendPugFile(__dirname, 'myRecipes', options);
    });
}