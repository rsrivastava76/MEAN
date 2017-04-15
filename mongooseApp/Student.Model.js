// grab the things we need
var mongoose = require('mongoose').set('debug', true);
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({


});


module.exports = mongoose.model('Student', userSchema);
