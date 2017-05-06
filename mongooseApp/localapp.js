var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose').set('debug', true);
var Item = require('./Item.model');

var port = 3000;

//Enabling CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connection to mongodb
var db = 'mongodb://rsrivastava76.local/example'
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: 'rs',
  pass: 'rs'
}
options.server.socketOptions = options.replset.socketOptions = { keepAlive: 120 };
mongoose.connect(db, options);


// all us to parse json
app.use(bodyParser.json())
// urlencoded will give us value though Rest Client
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('happy to be here');
});

app.get('/items', function(req, res) {
  console.log('getting all Item');
  Item.find({})
    .exec(function(err, docs) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(docs);
        res.json(docs);
      }
    });
});

app.get('/items/:id', function(req, res) {
  console.log('getting all Item ');
  Item.findOne({
    _id: req.params.id
    })
    .exec(function(err, docs) {
      if(err) {
        res.send('error occured' + err)
      } else {
        console.log(docs);
        res.json(docs);
      }
    });
});

app.post('/item', function(req, res) {

  // create Item Object schema
  var newItem = new Item();
  newItem.taskName = req.body.taskName;
  newItem.completed = req.body.completed;
  newItem.taskType = req.body.taskType;

  newItem.save(function(err, item) {
    if(err) {
      res.send('error saving item');
    } else {
      console.log(item);
      res.send(item);
    }
  });
});

app.post('/itemJSON', function(req, res) {
  Item.create(req.body, function(err, item) {
    if(err) {
      res.send('error saving Item');
    } else {
      console.log(item);
      res.send(item);
    }
  });
});

app.put('/item/:id', function(req, res) {
  Item.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { taskName: req.body.taskName, completed : req.body.completed }
  }, {upsert: true}, function(err, newItem) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newItem);
      res.send(newItem);
    }
  });
});

app.delete('/item/:id', function(req, res) {
  Item.remove({
    _id: req.params.id
  }, function(err, item) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(item);
      res.status(204);
    }
  });
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
