var mongoose = require('mongoose').set('debug', true);
var Schema = mongoose.Schema;

var BookSchema = new Schema({

});

//with force collection Name
module.exports = mongoose.model('Item', BookSchema);
