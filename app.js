const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const homeRouter = require('./routes/homeRouter');

const account = require('./account');
const recipe = require('./recipe');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(account.user);
app.use(account.profile);
app.use(recipe.recipes);

app.use("/", homeRouter);

app.listen(3001, function () {
   console.log('server is running');
});