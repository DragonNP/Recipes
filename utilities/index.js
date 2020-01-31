const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pug = require('pug');
const path = require('path');
const errorHandler = require('errorhandler');

const translator = require('../translator');
const recipes = require('../recipes');
const users = require('../users');
const log = require('../logger');
const api = require('../api');
const errors = require('../errors');

module.exports.initProject = initProject;

function initProject(app) {
    log.setLevel('info');
    if (process.env.NODE_ENV === 'development') {
        // only use in development
        log.setLevel('debug');
        app.use(errorHandler());
    }
    else {
        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).send('Server Error');
        });
    }

    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use((req, res, next) => {log.info(req.method + ': ' + req.originalUrl); next()});
    app.use('/assets', express.static('assets'));
    app.use(cookieParser());
    app.use(responseCustom);
    app.use(users);
    app.use(recipes);
    app.use(errors);

    log.debug('Initializing: set view engine:pug');
    log.debug('Initializing: use bodyParser, assets, cookieParser, responseCustom, users, recipes, errors');
}

function responseCustom(request, response, next) {
    log.debug('Utilities: called responseCustom method');

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

        if (response.langs && response.currentLang) return sendPugFilePart1(request, response, next, pathFile, options);

        translator.getLanguages(langs => {
            response.langs = langs;
            response.currentLang = {
                domain: request.cookies['lang'] || 'us',
                name: response.langs[request.cookies['lang'] || 'us']
            };

            sendPugFilePart1(request, response, next, pathFile, options);
        });
    };
    next();
}

function sendPugFilePart1(request, response, next, pathFile, options) {
    options.langs = response.langs;
    options.currentLang = response.currentLang;

    translator.translate(options.currentLang.domain, options, array => {
        if (request.cookies.token && !request.url.includes('/login') && !request.url.includes('/registration')) {
            if(response.myProfile) {
                array.username = response.myProfile.username;
                renderFile(response, __dirname, pathFile, array, next);
            }
            else {
                api.getMyProfile(request.cookies.token, (err, res, body) => {
                    array.username = body.username;
                    renderFile(response, __dirname, pathFile, array, next);
                });
            }
        }
        else {
            options.isProfile = false;
            renderFile(response, __dirname, pathFile, array, next);
        }
    });
}

function renderFile(response, __dirname, pathFile, options, next) {
    pug.renderFile(
        path.join(__dirname, '../views/', pathFile + '.pug'),
        options,
        function (err, data) {
            if (!err) return response.send(data);
            log.err(err);
            return next()
        });
}