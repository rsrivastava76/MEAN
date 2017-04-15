var mongoose = require('mongoose').set('debug', true);
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  author: String,
  category: String,
  published:{
  type: Date,
  default:Date.now
  },
  //Embedded Sub-document
  detail:{
  modelNumber:Number,
  hardCover:Boolean,
  reviews:Number,
  rank:Number
  }
});

//with force collection Name
module.exports = mongoose.model('Test', BookSchema, 'test');
