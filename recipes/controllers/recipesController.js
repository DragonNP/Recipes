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

        const options = {
            title: 'New Recipes',
            myProfile: 'My profile',
            newRecipes: 'New recipes',
            myRecipes: 'My recipes',
            recipes: body
        };

        response.sendPugFile(__dirname, 'newRecipes', options);
    });
}

function myRecipes(request, response, next) {
}