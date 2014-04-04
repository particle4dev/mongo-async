var _ = require('lodash');
var Fiber = require('fibers');
var Future = require('fibers/future'), wait = Future.wait;
var MongoClient = require('mongodb').MongoClient;

var Connection = function(url, options){
  var self = this;
  self._url = url;
  self._connectCallbacks = [];
  self._connect(url);
};

_.extend(Connection.prototype, {
  constructor: Connection,
  _connect: function(url){
    var self = this;
    MongoClient.connect(url, function(err, db){
      if (err) throw err;
      self._db = db;
      _.each(self._connectCallbacks, function (c) {
        c();
      });
    });
  },
  _fiberConnectCallbacks: function(cb){
    var self = this;
    self._connectCallbacks.push(cb);
  },
  _ensureConnected: function(){
    var self = this;
    if(!self._db){
      var fiber = Fiber.current;
      self._fiberConnectCallbacks(function(){
        fiber.run();
      });
      Fiber.yield();
    }
  },
  find: function(collectionName, query){
    var self = this;
    self._ensureConnected();
    var collection = self._db.collection(collectionName);
    return collection.find(query);
  },
  close: function(){
    var self = this;
    if(self._db){
      self._db.close();
    }
  },
  insert: function(collectionName, document){
    var self = this;
    self._ensureConnected();
    var collection = self._db.collection(collectionName);
    var future = new Future();
    collection.insert(document,
                      {safe: true}, future.resolver());
    return future.wait();
  },
  remove: function(collectionName, selector){
    var self = this;
    self._ensureConnected();
    var collection = self._db.collection(collectionName);
    var future = new Future();
    collection.remove(selector,
                      {safe: true}, future.resolver());
    return future.wait();
  },
  update: function(collectionName, selector, mod, options){
    var self = this;
    self._ensureConnected();
    var collection = self._db.collection(collectionName);
    var future = new Future();
    if (!options) options = {};
    options = _.extend({safe: true}, options);
    collection.update(selector,
                      mod, options, future.resolver());
    return future.wait();
  },
  save: function(collectionName, document){
    var self = this;
    self._ensureConnected();
    var collection = self._db.collection(collectionName);
    var future = new Future();
    collection.save(document,
                    {safe: true}, future.resolver());
    return future.wait();
  },
  dropCollection: function(collectionName){
    var self = this;
    self._ensureConnected();
    var collection = self._db.collection(collectionName);
    var future = new Future();
    collection.drop(future.resolver());
    return future.wait();
  },
  withCollection: function(collectionName, cb){
    var self = this;
    self._ensureConnected();
    var collection = self._db.collection(collectionName);
    var future = new Future();
    cb(collection, future.resolver());
    return future.wait();
  }
});

/**
 * exports
 */
module.exports = Connection;