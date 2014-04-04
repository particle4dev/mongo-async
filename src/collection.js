var _ = require('lodash');
var Fiber = require('fibers');
var Future = require('fibers/future'), wait = Future.wait;
var MongodbRemote = require('./mongodbRemote');

var Collection = function(name){
  var self = this;
  self._name = name;
  self._driver = MongodbRemote.defaultMongodbRemoteDriver();
  self._collection = self._driver.wrapMethod(name);
};
_.extend(Collection.prototype, {
  constructor: Collection,
  insert: function(document){
    var self = this;
    return self._collection.insert(document);
  },
  find: function(query){
    var self = this;
    return self._collection.find(query);
  }
});
module.exports = Collection;
