var express = require('express')
  , app = express() 
  , bodyParser = require('body-parser')
var config = require("./config")
var serverPort = config.serverPort
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
var http = require('http');
var dbConnection = require('./db');
var db = new dbConnection();

process.on('unhandledRejection', (reason, p) => {
  console.error(reason, ' Unhandled Rejection at Promise ', p);
}).on('uncaughtException', err => {
  console.error((new Date).toUTCString() + ' uncaughtException: ', err.message)
});

http.createServer(app).listen(serverPort, function () {
	console.log('server running on port : %d', serverPort);
	
	require('./routes')(app,db);
});