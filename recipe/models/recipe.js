const crypto = require("crypto");
let recipe = [{
    path_img: '/img.png',
    name: 'cake',
    description: 'this is cake',
    ingredients: 'eggs, muka',
    instruction: 'eggs + muka = cake',
    date: '25.10.2019',
    account_id: '1',
    recipe_id: '121212',
}];

exports.addRecipe = function (path_img, name, description, ingredients, instruction, date, account_id, fn) {
    const recipe_id = crypto.randomBytes(16).toString("hex");

    const data = recipe.push({
        path_img: path_img,
        name: name,
        description: description,
        ingredients: ingredients,
        instruction: instruction,
        date: date,
        account_id: account_id,
        recipe_id: recipe_id
    });
    fn(undefined, data);
};

exports.getRecipes = function () {
    return recipe
};