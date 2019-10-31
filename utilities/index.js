const pug = require('pug');
const path = require('path');
const api = require('../api');
const recipes = require('../recipes');
const log = require('../logger');
const bodyParser = require('body-parser');

module.exports.initProject = initProject;

function initProject(app) {
    log.setLevel('debug');
    api.init('https://recipes-api-dragonnp.herokuapp.com/');
    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));

    log.debug('api init');
    log.debug('set view engine:pug');
    log.debug('use bodyParser');

    function responseCustom(request, response, next) {
        response.sendPugFile = (dirname, filename, options) => {
            options = options || {};

            pug.renderFile(
                path.join(dirname, '..\\views\\', filename + '.pug'),
                options,
                function (err, data) {
                    if (err !== null) {
                        response.sendStatus(500);
                        return console.log(err);
                    }
                    return response.send(data)
                });
        };
        next();
    }
    app.use(responseCustom);
    app.use(recipes);

    log.debug('use responseCustom');
    log.debug('use recipes');
}