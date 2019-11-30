const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pug = require('pug');
const path = require('path');

const translator = require('../translator');
const recipes = require('../recipes');
const users = require('../users');
const log = require('../logger');
const api = require('../api');

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
    log.info('utilities: called responseCustom method');

    response.sendPugFile = (pathFile, options) => {
        options = options || {};

        if (!options.title)
            options.title = 'Recipes';
        options.isProfile = true;
        options.welcome = 'Welcome';
        options.edit = 'Edit';
        options.settings = 'Settings';
        options.logout = 'Logout';

        options.notification = 'Notification';
        options.clearAll = 'Clear All';
        options.noNotifications = 'No Notifications';

        options.myProfile = 'My Profile';
        options.newRecipes = 'New Recipes';
        options.myRecipes = 'My Recipes';
        options.addRecipe = 'Add Recipe';
        options.favorites = 'Favorites';

        options.currentLang = {
            domain: request.cookies['lang'] || 'us',
            name: translator.getNameLang(request.cookies['lang'] || 'us')
        };
        options.langs = translator.getLanguages();

        if (request.cookies.token) {
            options = translator.translate(request.cookies['lang'] || 'us', options);

            return api.getMyProfile(request.cookies.token, (err, res, body) => {
                options.username = body.username;
                pug.renderFile(
                    path.join(__dirname, '../views/', pathFile + '.pug'),
                    options,
                    function (err, data) {
                        if (!err) return response.send(data);

                        response.sendStatus(500);
                        return log.err(err);
                    });
            });
        }
        else {
            options.isProfile = false;
            options.sign_in = 'Sign In';
            options.or = 'or';
            options.sign_up = 'Sign Up';
            options = translator.translate(request.cookies['lang'] || 'us', options);

            pug.renderFile(
                path.join(__dirname, '../views/', pathFile + '.pug'),
                options,
                function (err, data) {
                    if (!err) return response.send(data);

                    response.sendStatus(500);
                    return log.err(err);
                });
        }
    };
    next();
}