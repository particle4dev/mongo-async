/**
var asynccollection = {};
var MONGO = {
    url: 'mongodb://localhost:27001/',
    database: 'app'
};

var config = (function (_super) {
    core.utils.extends(config, _super);
    function config() {
        _super.call(this, "config");
    }
    config.prototype.get = function(c, v){
        if(_.isObject(c)){
            _.extend(MONGO, c);
        }
        else if(_.isString(c) && !_.isUndefined(v)){
            MONGO[c] = v;
        }
        else if(_.isString(c)){
            return MONGO[c];
        }
    };
    return new config();
})(core.ObjectSystem);
*/




var _ = require('lodash');
var MongoConnection = require('./mongoConnection');
var core = require('../core');

var MongodbRemoteDriver = (function (_super) {
    core.utils.extends(MongodbRemoteDriver, _super);
    function MongodbRemoteDriver() {
        _super.call(this, "MongodbRemoteDriver");
        this.newConnect();
    }
    MongodbRemoteDriver.prototype.newConnect = function () {
        if(this._connection){
            this._connection.close();
            this._connection = null;
        }
        var config = this.getComponent('config');
        var url = config.get('url') + config.get('database');
        this._connection = new MongoConnection(url);
    };
    return MongodbRemoteDriver;
})(core.ObjectSystem);

var MongodbRemote = {};
MongodbRemote.defaultMongodbRemoteDriver = _.once(function(){
    return new MongodbRemoteDriver();
});

module.exports = MongodbRemote;


qcollection.config({
    database: 'test'
    url: 'mongodb://localhost:27001/',
    port: 27001
});

var account = new qcollection.Collection('account');
sync(function(){
    try {
        var list = account.find({});
    }
    catch(e){

    }
});