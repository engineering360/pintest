'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser');

var app = express();
//dotenv module is used for enabling reading hidden variables from a file named .env
//the variables can then be accessed with process.env.variableName
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

/*The following code related to the bodyParser module is applied regarding the 
form post request. It enables reading the values of the submitted form input
elements with req.body.inputElementNameProperty*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({    
  extended: true
}));

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//calling the function exported from the index.js file
routes(app, passport);

var port = process.env.PORT || https://pinterest-clone-project.herokuapp.com/;
app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
