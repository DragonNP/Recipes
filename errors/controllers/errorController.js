const log = require('../../logger');

module.exports = {
    get404Page
};

async function get404Page(request, response) {
    log.debug('ErrorController: called get404Page method');

    response.sendPugFile( 'errors/error404',
        {
            title: 'Page not found',
            text404: 'It\'s looking like you may have taken a wrong turn. Don\'t worry...\nit happens to the best of us. You might want to check your internet connection.\nHere\'s a little tip that might help you get back on track',
            back_to_home: 'Back to Home',
            page_not_found: 'Page not found'
        });
}