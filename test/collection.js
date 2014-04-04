var Fiber = require('fibers');
var assert = require('assert');
var qcollection = require('../index');

suite("collection", function() {
  qcollection.connect({
    url: 'mongodb://localhost',
    database: 'blog',
    port: '27017'
  });
  var run = 'mongodb';
  var testCollection = new qcollection.Collection('test');
  test("step 1 - insert", function(done) {
    qcollection.sequence(function() {
      testCollection.insert({run: run, x: 1});
      testCollection.find({}).toArray(function(err, docs) {
        console.log(docs);
        done();
      });
    });
  });
});