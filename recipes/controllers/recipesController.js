const api = require('../../api');
const log = require('../../logger');

const error_options = {
    title: 'Error',
    path1: '/',
    nameBt1: 'Home',
    isVisitableTwoBt: false
};

module.exports = {
    newRecipes,
    myRecipes,
    getRecipe,
    favorites,
    getAddRecipe,
    postCreateRecipe
};

async function newRecipes(request, response, next) {
    log.info('recipesController: called newRecipes method');

    api.getRecipes((err, res, body) => {
        if (err || body.message) {
            error_options.error = err || body.message;
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const options = {
            title: 'New Recipes',
            image: 'Image',
            name: 'Name',
            description: 'Description',
            ingredients: 'Ingredients',
            recipes: body,
            goTo: 'Go To',
        };
        response.sendPugFile( 'recipesPages/newRecipes', options);
    });
}

async function myRecipes(request, response, next) {
    log.info('recipesController: called myRecipes method');

    const cookies = request.cookies;

    api.getMyRecipes(cookies.token, (err, res, body) => {
        if (err || body.message) {
            error_options.error = err || body.message;
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const options = {
            title: 'My Recipes',
            image: 'Image',
            name: 'Name',
            description: 'Description',
            ingredients: 'Ingredients',
            recipes: body,
            goTo: 'Go To',
            addRecipe: 'Add Recipe',
        };

        response.sendPugFile('recipesPages/myRecipes', options);
    });
}

async function getRecipe(request, response, next) {
    log.info('recipesController: called recipe method');

    const query = request.query;
    if(!query.id)
        return response.redirect('/newRecipes');

    api.getRecipeById(query.id, (err, res, body) => {
        if (err || body.message) {
            error_options.error = err || body.message;
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const recipe = body;
        api.getUserById(body.account_id, (err, res, body) => {
            if (err || body.message) {
                error_options.error = body.message || err;
                return response.sendPugFile('error', error_options);
            }
            response.sendPugFile('recipesPages/recipe', {
                title: recipe.name,
                image: 'Image',
                name: 'Name',
                description: 'Description',
                ingredients: 'Ingredients',
                instruction: 'Instruction',
                dateAdded: 'Date Added',
                author: 'Author',
                username: body.username,
                recipe: recipe,
            })
        });
    });
}

async function favorites(request, response, next) {
    log.info('recipesController: called favourites method');
    response.redirect('/newRecipes');
}

async function getAddRecipe(request, response, next) {
    log.info('recipesController: called getCreateRecipe method');
    response.sendPugFile('recipesPages/addRecipe', {
        title: 'Add Recipe',

        name: 'Name Recipe',
        description: 'Description',
        ingredients: 'Ingredients',
        instruction: 'Instruction',
        image: 'Image path (beta)',
        addRecipe: 'Add Recipe',
        home: 'Home'
    });
}

async function postCreateRecipe(request, response, next) {
    const body = request.body;
    body.token = request.cookies['token'];

    api.addRecipe(body, (err, res, body) => {
        if (err || body.message) {
            error_options.error = err || body.message;
            return response.sendPugFile(__dirname, 'error', error_options);
        }
        response.redirect('/recipe?id='.concat(body.id));
    });
}