request = require('request-json');

let client;
const recipes_path = {
    add: 'recipes/add/',
    addFavourites: 'recipes/addFavourites/',
    recipes: 'recipes/',
    recipe: 'recipes/',
    delRecipe: 'recipes/'
};
const users_path = {
    add: 'users/registration/',
    authenticate: 'users/authenticate',
    update: 'users/update/',
    myProfile: 'users/myProfile/',
    users: 'users/'
};

module.exports = {
    init,
    addRecipe,
    addFavourites,
    getRecipes,
    getRecipe,
    deleteRecipe
};

function init(uri) {
    client = request.createClient(uri);
}

function addRecipe(json, fn) {
    if (!client) return fn('client not init');
    client.post(recipes_path.add, json, fn);
}

function addFavourites(json, fn) {
    if (!client) return fn('client not init');
    client.post(recipes_path.addFavourites, json, fn);
}

function getRecipes(fn) {
    if (!client) return fn('client not init');
    client.get(recipes_path.recipes, {}, fn);
}

function getRecipe(json, fn) {
    if (!client) return fn('client not init');
    client.get(recipes_path.recipes, json, fn);
}

function deleteRecipe(json, fn) {
    if (!client) return fn('client not init');
    client.delete(recipes_path.recipes, json, fn);
}