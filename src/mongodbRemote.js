var _ = require('lodash');
var MongoConnection = require('./connection');

var MongodbRemoteDriver = function(url){
    var self = this;
    self._url = url;
    self._newConnect();
};
_.extend(MongodbRemoteDriver.prototype, {
    constructor: MongodbRemoteDriver,
    _newConnect: function () {
        var self = this;
        if(self._connection){
            self._connection.close();
            self._connection = null;
        }
        self._connection = new MongoConnection(self._url);
    },
    wrapMethod: function(name){
        var self = this;
        var ret = {};
        _.each(
            [
            'find', 'insert', 'update', 'remove'
            //'findOne', 'upsert', '_ensureIndex', '_dropIndex', '_createCappedCollection', 'dropCollection'
            ],
            function (m) {
                ret[m] = _.bind(self._connection[m], self._connection, name);
            });
        return ret;
    }
});
var mongodbRemoteDriverObject = null;
module.exports = {
    defaultMongodbRemoteDriver: _.once(function(url){
        if(url){
            mongodbRemoteDriverObject = new MongodbRemoteDriver(url);
        }
        return mongodbRemoteDriverObject;
    })
};
