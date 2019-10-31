const express = require('express');
const recipes = require('./recipes');
const api = require('./api');
const utilities = require('./utilities');

api.init('https://recipes-api-dragonnp.herokuapp.com/');

const app = express();
app.set('view engine', 'pug');

app.use(utilities);
app.use(recipes);

app.listen(8080);