request = require('request-json');
const log = require('../logger');

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
    log.info('api initiating');
    client = request.createClient(uri);
}

function addRecipe(json, fn) {
    if (!client) return fn('client not init');
    log.info('api: called addRecipe method');
    client.post(recipes_path.add, json, fn);
}

function addFavourites(json, fn) {
    if (!client) return fn('client not init');
    log.info('api: called addFavourites method');
    client.post(recipes_path.addFavourites, json, fn);
}

function getRecipes(fn) {
    if (!client) return fn('client not init');
    log.info('api: called getRecipes method');
    client.get(recipes_path.recipes, {}, fn);
}

function getRecipe(json, fn) {
    if (!client) return fn('client not init');
    log.info('api: called getRecipe method');
    client.get(recipes_path.recipes, json, fn);
}

function deleteRecipe(json, fn) {
    if (!client) return fn('client not init');
    log.info('api: called deleteRecipe method');
    client.delete(recipes_path.recipes, json, fn);
}