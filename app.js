const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const homeRouter = require('./routes/homeRouter');
const recipesRouter = require('./routes/recipesRouter');

const account = require('./account');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(account.profile);
app.use(account.userRouter);
app.use("/", homeRouter);
app.use("/", recipesRouter);

app.listen(3001, function () {
   console.log('server is running');
});