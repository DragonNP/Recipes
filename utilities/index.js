const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pug = require('pug');
const path = require('path');

const translation = require('../translation');
const recipes = require('../recipes');
const users = require('../users');
const log = require('../logger');

module.exports.initProject = initProject;

function initProject(app) {
    log.setLevel('debug');

    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('wwwroot'));
    app.use(cookieParser());
    app.use(responseCustom);
    app.use(users);
    app.use(recipes);

    log.debug('initializing: set view engine:pug');
    log.debug('initializing: use bodyParser, cookieParser, responseCustom, users, recipes, notFound');
}

function responseCustom(request, response, next) {
    response.sendPugFile = (dirname, filename, options) => {

        options = options || {};

        if (!options.title)
            options.title = translation.text('Recipes');
        options.myProfile = translation.text('My Profile');
        options.newRecipes = translation.text('New Recipes');
        options.myRecipes = translation.text('My Recipes');

        pug.renderFile(
            path.join(dirname, '../views/', filename + '.pug'),
            options,
            function (err, data) {
                if (!err) return response.send(data);

                response.sendStatus(500);
                return log.err(err);
            });
    };
    next();
}