const api = require('../../api');
const utilities = require('../../utilities');

module.exports = {
    newRecipes
};

function newRecipes(request, response, next) {
    api.getRecipes((err, res, body) => {
        if (err) console.log(err);

        const options = {
            title: 'New Recipes',
            recipes: body
        };

        response.sendPugFile(__dirname, 'newRecipes', options);
    });
}