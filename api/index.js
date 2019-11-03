const rp = require('request-promise');
const log = require('../logger');

const uri = 'https://recipes-api-dragonnp.herokuapp.com';
const url_recipes = {
    add: `${uri}/recipes/add/`,
    addFavourites: `${uri}/recipes/addFavourites/`,
    recipes: `${uri}/recipes/`,
    delRecipe: `${uri}/recipes/`
};
const url_users = {
    registration: `${uri}/users/registration/`,
    authenticate: `${uri}/users/authenticate`,
    update: `${uri}/users/update/`,
    myProfile: `${uri}/users/myProfile/`,
    users: `${uri}/users/`
};

module.exports = {
    // Recipes
    getRecipes,
    getRecipesByID,
    getRecipe,
    addRecipe,
    addFavourites,
    deleteRecipe,

    // Users
    myProfile,
    getUser,
    updateUser,
    addUser,
    authenticateUser,
};

// Recipes
function getRecipes(fn) {
    log.info('api: called getRecipes method');

    const options = {
      method: 'GET',
      url: url_recipes.recipes,
      json: true
    };

    rp(options, fn);
}

function getRecipesByID(json, fn) {
    log.info('api: called getRecipes method');

    const options = {
        method: 'GET',
        url: url_recipes.recipes,
        form: json,
        json: true
    };

    rp(options, fn);
}

function getRecipe(json, fn) {
    log.info('api: called getRecipe method');

    const options = {
        method: 'GET',
        url: url_recipes.recipes,
        form: json,
        json: true
    };

    rp(options, fn);
}

function addRecipe(json, fn) {
    log.info('api: called addRecipe method');

    const options = {
        method: 'POST',
        url: url_recipes.add,
        form: json,
        json: true
    };

    rp(options, fn);
}

function addFavourites(json, fn) {
    log.info('api: called addFavourites method');

    const options = {
        method: 'POST',
        url: url_recipes.addFavourites,
        form: json,
        json: true
    };

    rp(options, fn);
}

function deleteRecipe(json, fn) {
    log.info('api: called deleteRecipe method');

    const options = {
        method: 'DELETE',
        url: url_recipes.delRecipe,
        form: json,
        json: true
    };

    rp(options, fn);
}

// Users
function myProfile(json, fn) {
    log.info('api: called myProfile method');

    const options = {
        method: 'GET',
        url: url_users.myProfile,
        form: json,
        json: true
    };

    rp(options, fn);
}

function getUser(json, fn) {
    log.info('api: called getUser method');

    const options = {
        method: 'GET',
        url: url_users.users,
        form: json,
        json: true
    };

    rp(options, fn);
}

function updateUser(json, fn) {
    log.info('api: called updateUser method');

    const options = {
        method: 'POST',
        url: url_users.update,
        form: json,
        json: true
    };

    rp(options, fn);
}

function addUser(json, fn) {
    log.info('api: called addUser method');

    const options = {
        method: 'POST',
        url: url_users.add,
        form: json,
        json: true
    };

    rp(options, fn);
}

function authenticateUser(json, fn) {
    log.info('api: called authenticateUser method');

    const options = {
        method: 'POST',
        url: url_users.authenticate,
        form: json,
        json: true
    };

    rp(options, fn);
}