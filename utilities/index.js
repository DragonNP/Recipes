const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pug = require('pug');
const path = require('path');

const translator = require('../translator');
const recipes = require('../recipes');
const users = require('../users');
const log = require('../logger');

module.exports.initProject = initProject;

function initProject(app) {
    log.setLevel('debug');

    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/assets', express.static('assets'));
    app.use(cookieParser());
    app.use(responseCustom);
    app.use(users);
    app.use(recipes);

    log.debug('initializing: set view engine:pug');
    log.debug('initializing: use bodyParser, cookieParser, responseCustom, users, recipes, notFound');
}

function responseCustom(request, response, next) {
    response.sendPugFile = (pathFile, options) => {

        options = options || {};

        if (!options.title)
            options.title = 'Recipes';
        options.welcome = 'Welcome';
        options.userName = 'Nikita';
        options.edit = 'Edit';
        options.settings = 'Settings';
        options.logout = 'Logout';

        options.myProfile = 'My Profile';
        options.newRecipes = 'New Recipes';
        options.myRecipes = 'My Recipes';
        options.addRecipe = 'Add Recipe';
        options.favorites = 'Favorites';

        options = translator.translate('en', options);

        pug.renderFile(
            path.join(__dirname, '../views/', pathFile + '.pug'),
            options,
            function (err, data) {
                if (!err) return response.send(data);

                response.sendStatus(500);
                return log.err(err);
            });
    };
    next();
}