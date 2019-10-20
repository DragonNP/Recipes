const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const homeRouter = require('./routes/homeRouter');
const recipesRouter = require('./routes/recipesRouter');
const profileRouter = require('./routes/profileRouter');

const app = express();
app.set('views', __dirname + '/files');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", homeRouter);
app.use("/", recipesRouter);
app.use("/", profileRouter);

app.listen(3001, function () {
   console.log('server is running');
});