var MongoClient = require('mongodb').MongoClient
var config = require('./config') 

if(config.mongoAuth == true){
  var url = 'mongodb://'+config.mongodbUser+':'+config.mongodbPwd+'@'+config.mongoDbHost+':'+config.mongoDbPort+'/'+config.mongoDbName+'';
}else{
  var url = 'mongodb://'+config.mongoDbHost+':'+config.mongoDbPort
}
// var url = 'mongodb://'+config.mongoDbHost+':'+config.mongoDbPort
// var url = 'mongodb://localhost:27017'
var dbConnection;

var options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
};
console.log("url: ",url)

function mongoDB(){
    MongoClient.connect(url,options, function(err, client) {
       if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          console.log('Connection established to', url);
          dbConnection = client.db(config.mongoDbName);
        }
    });
}

function isEmptyObject(obj) {
  let name;
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

mongoDB.prototype.find = function(collectionName,query,callback){
  let collection = dbConnection.collection(collectionName);
  collection.find(query).toArray(function(err,result){
    if(err){
      callback(err,null);
    }else{
      callback(null,result);
    }
  });
}

mongoDB.prototype.findSelect = function(collectionName,query, show, callback){
  let collection = dbConnection.collection(collectionName);
  collection.find(query).project(show).toArray(function(err,result){
    if(err){
      callback(err,null);
    }else{
      callback(null,result);
    }
  });
}

mongoDB.prototype.insert = function(collectionName,query,callback){
  let collection = dbConnection.collection(collectionName);
  query.timestamp = new Date();
  collection.insertOne(query,function(err,result){
      if(err){
          callback(err,null);
      }else{
          callback(null,result);
      }
  })
}

mongoDB.prototype.count = function(collectionName,query,callback) {
  let collection = dbConnection.collection(collectionName);
  collection.countDocuments(query,function(err,result){
    if(err){
      callback(err,null);
    }else{
      callback(null, result);
    }
  })
}

module.exports = mongoDB;