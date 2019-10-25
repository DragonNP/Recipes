const recipesRouter = require('./routes/recipesRouter');
const recipe = require('./models/recipe');

exports.recipes = recipesRouter;
exports.getRecipe = function () {
    return recipe
};