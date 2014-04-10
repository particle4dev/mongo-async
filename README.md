    
    qcollection.connect({
      url: 'mongodb://localhost',
      database: 'blog',
      port: '27017'
    });
    qcollection.sequence(function() {
      testCollection.insert({run: run, x: 1});
      testCollection.insert({run: run, x: 4, _id: 'save'});
      testCollection.find({run: run}).toArray(function(err, docs) {
      
      });
    });
    
