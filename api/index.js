const rp = require('request-promise');
const log = require('../logger');

const uri = 'https://recipes-api-dragonnp.herokuapp.com';
const url_recipes = {
    my: `${uri}/recipes/my`,
    recipes: `${uri}/recipes/all`,
    id: `${uri}/recipes/id`,
    accountId: `${uri}/recipes/accountId`,
    add: `${uri}/recipes/add`,
    favourites: `${uri}/recipes/addFavourites`,
    delRecipe: `${uri}/recipes`
};
const url_users = {
    registration: `${uri}/users/registration`,
    authenticate: `${uri}/users/authenticate`,
    update: `${uri}/users/update`,
    myProfile: `${uri}/users/myProfile`,
    users: `${uri}/users`
};
const url_lang = {
    byLang: `${uri}/lang/byLang`,
    all: `${uri}/lang/all`,
    addPack: `${uri}/lang/addPack`,
    updatePack: `${uri}/lang/updatePack`,
    names: `${uri}/lang/names`,
};

module.exports = {
    // Recipes
    getMyRecipes,
    getRecipes,
    getRecipeById,
    getRecipesByAccountId,
    addRecipe,
    addFavourites,
    deleteRecipe,

    // Users
    getMyProfile,
    getUserById,
    addUser,
    authenticateUser,
    updateUser,

    // Lang
    getPackLang,
    getLangNames,
    updatePackLang
};

// Recipes
function getMyRecipes(token, fn) {
    log.debug('API: called getMyRecipes method');

    const json = {
        token: token
    };
    const options = {
      method: 'GET',
      url: url_recipes.my,
      form: json,
      json: true
    };

    rp(options, fn);
}

function getRecipes(fn) {
    log.debug('API: called getRecipes method');

    const options = {
      method: 'GET',
      url: url_recipes.recipes,
      json: true
    };

    rp(options, fn);
}

function getRecipeById(id, fn) {
    log.debug('API: called getRecipesById method');

    const json = {
        id: id
    };
    const options = {
        method: 'GET',
        url: url_recipes.id,
        form: json,
        json: true
    };

    rp(options, fn);
}

function getRecipesByAccountId(id, fn) {
    log.debug('API: called getRecipesByAccountId method');

    const json = {
        account_id: id
    };
    const options = {
        method: 'GET',
        url: url_recipes.accountId,
        form: json,
        json: true
    };

    rp(options, fn);
}

function addRecipe(recipe, fn) {
    log.debug('API: called addRecipe method');

    const options = {
        method: 'POST',
        url: url_recipes.add,
        form: recipe,
        json: true
    };

    rp(options, fn);
}

function addFavourites(token, id, fn) {
    log.debug('API: called addFavourites method');

    const json = {
        token: token,
        id: id
    };
    const options = {
        method: 'POST',
        url: url_recipes.favourites,
        form: json,
        json: true
    };

    rp(options, fn);
}

function deleteRecipe(token, id, fn) {
    log.debug('API: called deleteRecipe method');

    const json = {
        token: token,
        id: id
    };
    const options = {
        method: 'DELETE',
        url: url_recipes.delRecipe,
        form: json,
        json: true
    };

    rp(options, fn);
}


// Users
function getMyProfile(token, fn) {
    log.debug('API: called getMyProfile method');

    const json = {
        token: token
    };
    const options = {
        method: 'GET',
        url: url_users.myProfile,
        form: json,
        json: true
    };

    rp(options, fn);
}

function getUserById(id, fn) {
    log.debug('API: called getUserById method');

    const json = {
        id: id
    };
    const options = {
        method: 'GET',
        url: url_users.users,
        form: json,
        json: true
    };

    rp(options, fn);
}

function addUser(user, fn) {
    log.debug('API: called addUser method');
    const options = {
        method: 'POST',
        url: url_users.registration,
        form: user,
        json: true
    };

    rp(options, fn);
}

function authenticateUser(email, password, fn) {
    log.debug('API: called authenticateUser method');

    const json = {
        email: email,
        password: password
    };
    const options = {
        method: 'POST',
        url: url_users.authenticate,
        form: json,
        json: true
    };

    rp(options, fn);
}

function updateUser(token, updatedUser, fn) {
    log.debug('API: called updateUser method');

    const json = updatedUser;
    json.token = token;
    const options = {
        method: 'POST',
        url: url_users.update,
        form: json,
        json: true
    };

    rp(options, fn);
}

// Lang
function getPackLang(lang, fn) {
    log.debug('API: called getPackLang method');

    const json = {
        lang: lang
    };
    const options = {
        method: 'GET',
        url: url_lang.byLang,
        form: json,
        json: true
    };

    rp(options, fn);
}

function getLangNames(fn) {
    log.debug('API: called getLangNames method');

    const json = {
        name: 'language_names'
    };
    const options = {
        method: 'GET',
        url: url_lang.all,
        form: json,
        json: true
    };

    rp(options, fn);
}

function updatePackLang(lang, updatedPack, fn) {
    log.debug('API: called updatePackLang method');

    updatedPack.lang = lang;

    const options = {
        method: 'POST',
        url: url_users.update,
        form: updatedPack,
        json: true
    };

    rp(options, fn);
}