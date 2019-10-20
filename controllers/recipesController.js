exports.newRecipes = function (request, response) {
    //const current_user = user.getUsers().find(o => o.id === request.cookies.id)
    if (undefined === undefined)
        return response.render('newRecipes', {
            name: 'DragonNP',
            items: [{
                id: 1,
                name: 'cake',
                ingredient: 'eggs, muka'
            }]
        });
};

exports.myRecipes = function (request, response) {
    response.render('myRecipes', {})
};