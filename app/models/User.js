var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  local: {
    name: String,
    email: String,
    password: String
  },
  facebook: {
    id: String,
    first: String,
    last: String,
    email: String,  
    token: String
  }
});
