var mongoose = require('mongoose').set('debug', true);
var Schema = mongoose.Schema;

//{"id": 1, "completed": false, "itemName": "milk", "date": "October 1, 2014 11:13:00"},

var ItemSchema = new Schema({

  taskName: String,
  taskOwner: String,
  taskType: String,
  completed: Boolean,
  insertDate:{
  type: Date,
  default:Date.now
  }
});

//with force collection Name
module.exports = mongoose.model('Item', ItemSchema);
