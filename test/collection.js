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
  qcollection.sequence(function() {
    testCollection.remove({});
  });
  test("step 1 - insert", function(done) {
    qcollection.sequence(function() {
      testCollection.insert({run: run, x: 1});
      testCollection.insert({run: run, x: 4, _id: 'save'});
      testCollection.find({run: run}).toArray(function(err, docs) {
        assert.equal(docs.length, 2);
        done();
      });
    });
  });

  test("step 2 - update", function(done) {
    qcollection.sequence(function() {
      testCollection.update({
        run: run
      }, {$set: {
        run: run + '_update'
      }}, {multi:true});
      testCollection.find({run: run}).toArray(function(err, docs) {
        assert.equal(docs.length, 0);
        done();
      });
    });
  });

  test("step 3 - save", function(done) {
    qcollection.sequence(function() {
      testCollection.save({
        _id: 'save',
        run: run + '_save'
      });
      testCollection.find({_id: 'save'}).toArray(function(err, docs) {
        assert.equal(docs.length, 1);
        assert.equal(docs[0].run, run + '_save');
        done();
      });
    });
  });

  test("step 4 - remove", function(done) {
    qcollection.sequence(function() {
      var n = testCollection.remove({
        _id: 'save',
        run: run + '_save'
      });
      assert.equal(n, 1);
      testCollection.remove({});
      done();
    });
  });

});