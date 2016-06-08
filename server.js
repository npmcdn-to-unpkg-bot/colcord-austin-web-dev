var express = require('express');
var app = express();
// var mongoose = require('mongoose');
//
// var url = '127.0.0.1:27017/webdev' + process.env.OPENSHIFT_APP_NAME;

var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connectionString);

// // Connect to mongodb
// var connect = function () {
//     mongoose.connect(url);
// };
// connect();

// var db = mongoose.connection;

// db.on('error', function(error){
//     console.log("Error loading the db - "+ error);
// });
//
// db.on('disconnected', connect);
//////////////////////////////

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var assignment = require('./assignment/app.js');
assignment(app);

var project = require('./project/app.js');
project(app);


require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
