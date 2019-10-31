const pug = require('pug');
const path = require('path');

module.exports = (request, response, next) => {
    response.sendPugFile = function(dirname, filename, options) {
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
            })
    };
    next();
};

