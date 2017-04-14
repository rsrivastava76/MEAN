var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var port = 8080;
var db = 'mongodb://rsrivastava76.local/example'
//var db = 'mongodb://test.mongodb.firstrain.com/exapleDB'

/*
db             - passed to the [underlying driver's db instance](http://mongodb.github.io/node-mongodb-native/2.1/api/Db.html)
 server         - passed to the [underlying driver's server instance(s)](http://mongodb.github.io/node-mongodb-native/2.1/api/Server.html)
 replset        - passed to the [underlying driver's ReplSet instance](http://mongodb.github.io/node-mongodb-native/2.1/api/ReplSet.html)
 user           - username for authentication (if not specified in uri)
 pass           - password for authentication (if not specified in uri)
 auth           - options for authentication
 mongos         - passed to the [underlying driver's mongos options](http://mongodb.github.io/node-mongodb-native/2.1/api/Mongos.html)
 promiseLibrary - sets the [underlying driver's promise library](http://mongodb.github.io/node-mongodb-native/2.1/api/MongoClient.html)

For long running applications, it is often prudent to enable keepAlive with a number of milliseconds. Without it, after some period of time you may start to see "connection closed" errors for what seems like no reason. If so, after reading this, you may decide to enable keepAlive:


var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'myUserName',
  pass: 'myPassword'
}
//options.server.socketOptions = options.replset.socketOptions = { keepAlive: 120 };

mongoose.connect(uri, options);
*/


mongoose.connect(db);

// all us to parse json
app.use(bodyParser.json())
// urlencoded will give us value though Rest Client
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('happy to be here');
});

app.get('/books', function(req, res) {
  console.log('getting all books');
  Book.find({})
    .exec(function(err, books) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.get('/books/:id', function(req, res) {
  console.log('getting all books');
  Book.findOne({
    _id: req.params.id
    })
    .exec(function(err, books) {
      if(err) {
        res.send('error occured' + err)
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.post('/book', function(req, res) {

  // create book Object schema
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save(function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.post('/book2', function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.put('/book/:id', function(req, res) {
  Book.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title, author : req.body.author }
  }, {upsert: true}, function(err, newBook) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newBook);
      res.send(newBook);
    }
  });
});

app.delete('/book/:id', function(req, res) {
  Book.findOneAndRemove({
    _id: req.params.id
  }, function(err, book) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(book);
      res.status(204);
    }
  });
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
