var Fiber = require('fibers');
var assert = require('assert');
var qcollection = require('../index');
/**
suite("basics", function() {
  var blog = new qcollection.Connection('mongodb://localhost:27017/blog');
  var collection = 'test';
  var run = 'mongodb';
  qcollection.sequence(function() {
    blog.remove(collection, {});
  });

  test("step 1 - insert", function(done) {
    qcollection.sequence(function() {
      blog.insert(collection, {run: run, x: 1});
      blog.insert(collection, {run: run, x: 4, _id: 'save'});
      blog.find(collection, {run: run}).toArray(function(err, docs) {
        assert.equal(docs.length, 2);
        done();
      });
    });
  });

  test("step 2 - update", function(done) {
    qcollection.sequence(function() {
      blog.update(collection, {
        run: run
      }, {$set: {
        run: run + '_update'
      }}, {multi:true});
      blog.find(collection, {run: run}).toArray(function(err, docs) {
        assert.equal(docs.length, 0);
        done();
      });
    });
  });

  test("step 3 - save", function(done) {
    qcollection.sequence(function() {
      blog.save(collection, {
        _id: 'save',
        run: run + '_save'
      });
      blog.find(collection, {_id: 'save'}).toArray(function(err, docs) {
        assert.equal(docs.length, 1);
        assert.equal(docs[0].run, run + '_save');
        done();
      });
    });
  });

  test("step 4 - remove", function(done) {
    qcollection.sequence(function() {
      var n = blog.remove(collection, {
        _id: 'save',
        run: run + '_save'
      });
      assert.equal(n, 1);
      blog.remove(collection, {});
      done();
    });
  });

  test("step 5 - withCollection", function(done) {
    qcollection.sequence(function() {
      var i = blog.withCollection(collection, function(collection, resolver){
        collection.insert({run: run, x: 1}, resolver);
      });
      assert.equal(i.length, 1);
      done();
    });
  });

  test("database error reporting", function(done) {
    qcollection.sequence(function() {
      try{
        var n = blog.insert(collection, {
          _id: 'save',
          run: run + '_save'
        });
        assert.equal(n.length, 1);
        blog.insert(collection, {
          _id: 'save',
          run: run + '_save'
        });
      }
      catch(e){
        //console.log(JSON.stringify(e));
      }
      done();
    });
  });

});
*/