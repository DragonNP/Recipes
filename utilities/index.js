const pug = require('pug');
const path = require('path');

module.exports.sendPugFile = function(dirname, filename, request, response, options) {
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