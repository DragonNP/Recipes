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

        options.isProfile = true;

        options.search = 'Search';
        options.notification = 'Notification';
        options.clearAll = 'Clear All';
        options.noNotifications = 'No Notifications';
        options.welcome = 'Welcome';
        options.myProfile = 'My Profile';
        options.edit = 'Edit';
        options.settings = 'Settings';
        options.logout = 'Logout';
        options.newRecipes = 'New Recipes';
        options.myRecipes = 'My Recipes';
        options.favorites = 'Favorites';
        options.addRecipe = 'Add Recipe';
        options.sign_in = 'Sign In';
        options.or = 'or';
        options.sign_up = 'Sign Up';

        translator.getLanguages(langs => {
            const current_lang = request.cookies['lang'] || 'us';
            options.langs = langs;
            options.currentLang = {
                domain: request.cookies['lang'] || 'us',
                name: options.langs[request.cookies['lang'] || 'us']
            };

            translator.translate(current_lang, options, array => {
                if (request.cookies.token && !request.url.includes('/login') &&
                    !request.url.includes('/registration')) {
                    api.getMyProfile(request.cookies.token, (err, res, body) => {
                        array.username = body.username;
                        renderFile(response, __dirname, pathFile, array);
                    });
                }
                else {
                    options.isProfile = false;
                    renderFile(response, __dirname, pathFile, array);
                }
            });
        });
    };
    next();
}

function renderFile(response, __dirname, pathFile, options) {
    pug.renderFile(
        path.join(__dirname, '../views/', pathFile + '.pug'),
        options,
        function (err, data) {
            if (!err) return response.send(data);

            response.sendStatus(500);
            return log.err(err);
        });
}