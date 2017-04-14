var mongoose = require('mongoose');
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

module.exports = mongoose.model('Book', BookSchema);
