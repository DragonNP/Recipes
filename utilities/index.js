const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pug = require('pug');
const path = require('path');

const recipes = require('../recipes');
const users = require('../users');
const log = require('../logger');
const locales = require('../locales');

module.exports.initProject = initProject;

function initProject(app) {
    log.setLevel('debug');

    function responseCustom(request, response, next) {
        response.sendPugFile = (dirname, filename, options) => {
            options = options || {};

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

    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(responseCustom);
    app.use(locales);
    app.use(users);
    app.use(recipes);

    log.debug('initializing: set view engine:pug');
    log.debug('initializing: use bodyParser, cookieParser, responseCustom, locales, users, recipes');
}