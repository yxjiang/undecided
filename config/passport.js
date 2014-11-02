var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../app/models/User');

var configAuth = require('./auth');

module.exports = function(passport) {

  // serialization
  passport.serializeUser(function(user, done) {
    done(null, user.id); 
  });

  // deserialization
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user); 
    });
  });


  
}
