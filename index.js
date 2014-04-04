var Fiber = require('fibers');
var Connection = require('./src/connection');
var Collection = require('./src/collection');
var MongodbRemote = require('./src/mongodbRemote');
/**
 * mongo config
 */
MONGO_URL = "mongodb://localhost";
MONGO_DATABASE = "blog";
MONGO_PORT = 27001;
/**
 * exports
 */
module.exports = {
  Connection: Connection,
  Collection: Collection,
  sequence: function(cb){
    Fiber(function() {
      cb();
    }).run();
  },

  connect: function(config){
    var url = config.url || MONGO_URL;
    var database = config.database || MONGO_DATABASE;
    var port =  config.port || MONGO_PORT;
    return MongodbRemote.defaultMongodbRemoteDriver(url + ":" + port + "/" + MONGO_DATABASE);
  }
};