const api = require('../../api');
const log = require('../../logger');

module.exports = {
    newRecipes,
    myRecipes,
    getRecipe,
    favorites,
    getAddRecipe,
    postCreateRecipe,
    postAddFavorites
};

async function newRecipes(request, response, next) {
    log.debug('RecipesController: called newRecipes method');

    api.getRecipes((err, res, body) => {
        if (err || body.message) {
            log.err(err || body.message);
            return next();
        }

        const options = {
            title: 'New Recipes',
            image: 'Image',
            name: 'Name',
            description: 'Description',
            ingredients: 'Ingredients',
            recipes: body,
            goTo: 'Go To',
            isEdit: false
        };
        response.sendPugFile( 'recipesPages/recipes', options);
    });
}

async function myRecipes(request, response, next) {
    log.debug('RecipesController: called myRecipes method');
    const cookies = request.cookies;

    api.getMyRecipes(cookies.token, (err, res, body) => {
        if (err || body.message) {
            log.err(err || body.message);
            return next();
        }

        const options = {
            title: 'My Recipes',
            image: 'Image',
            name: 'Name',
            description: 'Description',
            ingredients: 'Ingredients',
            recipes: body,
            goTo: 'Go To',
            isEdit: true
        };

        response.sendPugFile('recipesPages/recipes', options);
    });
}

async function getRecipe(request, response, next) {
    log.debug('RecipesController: called recipe method');
    const query = request.query;
    if (!query.id)
        return response.redirect('/newRecipes');

    api.getRecipeById(query.id, (err, res, body) => {
        if (err || body.message) {
            log.err(err || body.message);
            return next();
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
                log.err(err || body.message);
                return next();
            }

            options.authorName = body.username;
            api.getMyProfile(request.cookies.token || '', (err, res, body) => {
                if (err || body.message) log.err(err);
                if (options.authorName === body.username)
                    options.isEdit = true;
                response.myProfile = body;
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
            log.err(err || body.message);
            return next();
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

async function getAddRecipe(request, response) {
    log.debug('RecipesController: called getCreateRecipe method');

    response.sendPugFile('recipesPages/addRecipe', {
        title: 'Add Recipe',
        name: 'Name',
        description: 'Description',
        ingredients: 'Ingredients',
        instruction: 'Instruction',
        image: 'Image',
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
    log.debug('RecipesController: called postCreateRecipe method');
    const body = request.body;
    body.token = request.cookies['token'];

    api.addRecipe(body, (err, res, body) => {
        if (err || body.message) {
            log.err(err || body.message);
            return next();
        }
        response.redirect('/recipe?id='.concat(body.id));
    });
}

async function postAddFavorites(request, response, next) {
    log.debug('RecipesController: called postAddFavorites method');
    const id = request.body.id;
    const token = request.cookies.token;

    api.addFavourites(token, id, (err, req, body) => {
        if (err || body.message) {
            log.err(err || body.message);
            return next();
        }

        response.redirect('/recipe?id='.concat(id));
    })
}