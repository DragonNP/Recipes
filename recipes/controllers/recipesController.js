const api = require('../../api');
const log = require('../../logger');
const translation = require('../../translation');

const error_options = {
    title: translation.text('Error'),
    path1: '/',
    nameBt1: 'Home',
    isVisitableTwoBt: false
};

module.exports = {
    newRecipes,
    myRecipes,
    getRecipe,
    getAddRecipe,
    postCreateRecipe
};

async function newRecipes(request, response, next) {
    log.info('recipesController: called newRecipes method');

    api.getRecipes((err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(err || body.message);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const options = {
            title: translation.text('New Recipes'),
            image: translation.text('Image'),
            name: translation.text('Name'),
            description: translation.text('Description'),
            ingredients: translation.text('Ingredients'),
            recipes: body,
            goTo: translation.text('Go To'),
        };
        response.sendPugFile(__dirname, 'newRecipes', options);
    });
}

async function myRecipes(request, response, next) {
    log.info('recipesController: called myRecipes method');

    const cookies = request.cookies;

    api.getMyRecipes(cookies.token, (err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(err || body.message);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const options = {
            title: translation.text('My Recipes'),
            image: translation.text('Image'),
            name: translation.text('Name'),
            description: translation.text('Description'),
            ingredients: translation.text('Ingredients'),
            recipes: body,
            goTo: translation.text('Go To'),
            addRecipe: translation.text('Add Recipe'),
        };

        response.sendPugFile(__dirname, 'myRecipes', options);
    });
}

async function getRecipe(request, response, next) {
    log.info('recipesController: called recipe method');

    const query = request.query;
    if(!query.id)
        return response.redirect('/newRecipes');

    api.getRecipeById(query.id, (err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(err || body.message);
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const recipe = body;
        api.getUserById(body.account_id, (err, res, body) => {
            if (err || body.message) {
                error_options.error = translation.text(body.message || err);
                return response.sendPugFile(__dirname, 'error', error_options);
            }
            response.sendPugFile(__dirname, 'recipe', {
                title: translation.text(recipe.name),
                image: translation.text('Image'),
                name: translation.text('Name'),
                description: translation.text('Description'),
                ingredients: translation.text('Ingredients'),
                instruction: translation.text('Instruction'),
                date: translation.text('Date'),
                creator: translation.text('Creator'),
                username: body.username,
                recipe: recipe,
            })
        });
    });
}

async function getAddRecipe(request, response, next) {
    log.info('recipesController: called getCreateRecipe method');
    response.sendPugFile(__dirname, 'addRecipe', {
        title: translation.text('Add Recipe'),

        name: translation.text('Name Recipe'),
        description: translation.text('Description'),
        ingredients: translation.text('Ingredients'),
        instruction: translation.text('Instruction'),
        image: translation.text('Image path (beta)'),
        addRecipe: translation.text('Add Recipe'),
        home: translation.text('Home')
    });
}

async function postCreateRecipe(request, response, next) {
    const body = request.body;
    body.token = request.cookies['token'];

    api.addRecipe(body, (err, res, body) => {
        if (err || body.message) {
            error_options.error = translation.text(err || body.message);
            return response.sendPugFile(__dirname, 'error', error_options);
        }
        response.redirect('/recipe?id='.concat(body.id));
    });
}