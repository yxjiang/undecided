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

  // user local signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    User.findOne({'local.email': email}, function(err, user) {
      if (err)
        return done(err);
      if (user) { // user exists
        return done(null, false, {'message': 'User exists.'}); 
      } else {
        var newUser = new User();
        newUser.local.email = email; 
        newUser.local.username = req.body.username;
        newUser.local.password = password;
        newUser.save(function(err) {
          if (err)
            throw err;
          return done(null, newUser); 
        });
      }
    });  
  }));
  
}
