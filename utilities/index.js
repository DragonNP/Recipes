const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pug = require('pug');
const path = require('path');

const api = require('../api');
const recipes = require('../recipes');
const users = require('../users');
const log = require('../logger');
const locales = require('../locales');

module.exports.initProject = initProject;

function initProject(app) {
    log.setLevel('debug');
    api.init('https://recipes-api-dragonnp.herokuapp.com/');
    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    log.debug('api init');
    log.debug('set view engine:pug');
    log.debug('use bodyParser');
    log.debug('use cookieParser');

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
    app.use(responseCustom);
    app.use(locales);
    app.use(users);
    app.use(recipes);

    log.debug('use responseCustom');
    log.debug('use locales');
    log.debug('use users');
    log.debug('use recipes');
}