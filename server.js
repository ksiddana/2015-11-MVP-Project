// server.js

// set up ========================
var express  = require('express');                              // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
// var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var path = require('path');
var db = require('./database.js');
var url = require('url');

var port = 8080;

// configuration =================

// mongoose.connect('mongodb://localhost/chat');  // connect to mongoDB database on modulus.io
var app = express();

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());


app.get('/directory',function(req, res){
  console.log('POST /directory');
  var path = url.parse(req.url, true).pathname;
  console.log(path);

  db.users.find({}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
})

app.post('/',function(req, res) {
  console.log("\n\n\n----------------");
  console.log(typeof req.body);
  db.saveUsers(req.body)
  res.status(201).send('Server Stored :' + JSON.stringify(req.body));
});


// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port:", port);
