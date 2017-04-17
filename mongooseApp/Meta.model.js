var mongoose = require('mongoose').set('debug', true);
var Schema = mongoose.Schema;

var MetaSchema = new Schema({
  _id : String
});

//with force collection Name
module.exports = mongoose.model('Meta', MetaSchema, 'meta');
