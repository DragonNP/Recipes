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
    log.debug('RecipesController: called newRecipes method');

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
    log.debug('RecipesController: called myRecipes method');

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
        };

        response.sendPugFile('recipesPages/myRecipes', options);
    });
}

async function getRecipe(request, response, next) {
    log.debug('RecipesController: called recipe method');

    const query = request.query;
    if (!query.id)
        return response.redirect('/newRecipes');

    api.getRecipeById(query.id, (err, res, body) => {
        if (err || body.message) {
            error_options.error = err || body.message;
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const recipe = body;
        const options = {
            title: recipe.name,
            image: 'Image',
            name: 'Name',
            description: 'Description',
            ingredients: 'Ingredients',
            instruction: 'Instruction',
            dateAdded: 'Date Added',
            author: 'Author',
            recipe: recipe,
            isEdit: false
        };

        api.getUserById(body.account_id, (err, res, body) => {
            if (err || body.message) {
                log.err(err);
                return response.sendPugFile('recipesPages/recipe', options);
            }

            options.authorName = body.username;
            api.getMyProfile(request.cookies.token || '', (err, res, body) => {
                if (err || body.message) log.err(err);
                if (options.authorName === body.username)
                    options.isEdit = true;
                response.sendPugFile('recipesPages/recipe', options)
            });
        });
    });
}

async function favorites(request, response, next) {
    log.debug('RecipesController: called favourites method');

    const cookies = request.cookies;

    api.getMyProfile(cookies.token, (err, res, body) => {
        if (err || body.message) {
            error_options.error = err || body.message;
            return response.sendPugFile(__dirname, 'error', error_options);
        }

        const options = {
            title: 'Favorites',
            image: 'Image',
            name: 'Name',
            description: 'Description',
            ingredients: 'Ingredients',
            recipes: body,
            goTo: 'Go To',
        };

        response.sendPugFile('recipesPages/favorites', options);
    });
}

async function getAddRecipe(request, response, next) {
    log.debug('RecipesController: called getCreateRecipe method');
    response.sendPugFile('recipesPages/addRecipe', {
        title: 'Add Recipe',
        name: 'Name',
        description: 'Description',
        ingredients: 'Ingredients',
        instruction: 'Instruction',
        image: 'Image',
        addRecipe: 'Add Recipe',
        home: 'Home',

        enter_name_recipe: 'Enter name recipe',
        enter_description: 'Enter description',
        enter_path_image: 'Enter path image',

        enter_name_ingredient: 'Enter name ingredient',
        enter_quantity: 'Enter quantity',
        select_the_unit_of_measure: 'Select the unit of measure',
        piece: 'piece',
        gram: 'gram',
        milliliter: 'milliliter',
        liter: 'liter',
        cup: 'cup',
        teaspoon: 'teaspoon',
        tablespoon: 'tablespoon',
    });
}

async function postCreateRecipe(request, response, next) {
    const body = request.body;
    body.token = request.cookies['token'];
    log.debug(body);
    api.addRecipe(body, (err, res, body) => {
        if (err || body.message) {
            error_options.error = err || body.message;
            return response.sendPugFile(__dirname, 'error', error_options);
        }
        response.redirect('/recipe?id='.concat(body.id));
    });
}