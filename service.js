var express = require('express');
var app = express(); 
var port = process.env.PORT || 5000;

var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');

// connect the db 
var configDB = require('./config/db');
require('mongoose').connect(configDB.url);

// handle passport
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

app.use(session({secret: 'hallo', resave: true, saveUninitialized: true}));
app.use(require('morgan')('dev')); // output everything 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

app.use(require('cookie-parser')());
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

require('./app/routes.js')(app, passport);
// require('./app/route')(app);

app.listen(port);
console.log('Listen at port ' + port);

exports = module.exports = app;
