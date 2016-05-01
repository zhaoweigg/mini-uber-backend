var mongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var mongourl = 'mongodb://127.0.0.1:27017/driver_location';
var mydb;

mongoClient.connect(mongourl, function (err, db){
    if(!err) {
        console.log('We are connected!');
    } 
    
    var coll = db.collection('testc'); 

    for (i=0; i<1000000; i++) {    
        coll.insert({"nima": 123});    
    }
});
