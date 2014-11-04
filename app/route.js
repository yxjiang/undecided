// module.exports = function(app, passport) {
module.exports = function(app) {

  // // signup by passport
  // app.post('/auth/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/home',
  //   failureRedirect: '/auth/signup',
  //   failureFlash: true
  // }));

  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html'); 
  });

}
