const crypto = require("crypto");
let recipe = [];

exports.addRecipe = function (path_img, name, ingredients, instruction, date, account_id, fn) {
    const recipe_id = crypto.randomBytes(16).toString("hex");

    const data = recipe.push({
        path_img: path_img,
        name: name,
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