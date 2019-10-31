const express = require('express');
const utilities = require('./utilities');
const log = require('./logger');

const app = express();
utilities.initProject(app);

app.listen(process.env.PORT || 8080, () => {
    log.info('website is running')
});