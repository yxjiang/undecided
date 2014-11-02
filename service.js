var express = require('express');
var app = express(); 
var port = process.env.PORT || 8000;

var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');

// connect the db 
var configDB = require('./config/db.js');
require('mongoose').connect(configDB.url);

// handle passport
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

app.use(session({secret: 'hallo', resave: true, saveUninitialized: true}));
app.use(require('morgan')('dev')); // output everything 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cookie-parser')());

require('./app/route.js')(app, passport);

app.listen(port);
console.log('Listen at port ' + port);
