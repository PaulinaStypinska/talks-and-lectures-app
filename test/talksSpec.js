
// force the test environment to 'test'
process.env.NODE_ENV = 'test';
var assert = require('assert');

//schemas
var lectureschema = require('../data/schemaL');
var venueschema = require('../data/schema');
var speakerschema = require('../data/schemaSpeaker');
var tagschema = require('../data/schemaTags');

//fixtures file
var fixtures = require('../data/fixture');

//all CRUD modules
var venue = require('../data/venue');
var speaker = require('../data/speaker');
var tags = require('../data/tags');
var lecture = require('../data/lecture');


var databaseName = 'talks';

describe('lecture and venue test', function() {

    // Run once before all tests
    before(function(done) {
        // Create Schema
        venueschema.createSchema(databaseName, function(err, result) {
            done();
        })
    });
   before(function(done) {
           tagschema.createSchema(databaseName, function(err, result) {
            done();
    })
   });
   
    before(function(done) {
           speakerschema.createSchema(databaseName, function(err, result) {
            done();
    })
   });  
   
    before(function(done) {
           lectureschema.createSchema(databaseName, function(err, result) {
            done();
    })
   });
    
    before(function(done) { //using before for a FR key test of this size 
        fixtures.createFixtures(databaseName, function(err, result) {
            done();
        })
    });
 //testing all venues CRUD operations

     it('should create venues', function(done) {
        venue.create({"id":4, "name":"Piccadilly", "building": "lecture hall 04", "street": "The Cut", "number": "222", "postcode": "SE1"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
    
         it('should update venues', function(done) {
        venue.update({"id":2, "name":"St Andrew's", "building": "lecture hall 04", "street": "Shoreditch High Street", "number": "15", "postcode": "E15"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
         it('should retrieve venues', function(done) {
        venue.retrieve(1, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
         it('should remove venues', function(done) {
        venue.remove(4, function(err, result) {
            assert.equal(true, result);
            done();
        });
    });
    
    
//testing all speaker CRUD ops

         it('should create speaker', function(done) {
        speaker.create({"id":3, "firstname": "Ava", "lastname": "DuVernay", "bio": "bio3"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
        
         it('should update speaker', function(done) {
        speaker.update({"id":2, "firstname": "William","lastname": "Goldman", "bio": "bio3"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
         it('should retrieve speaker', function(done) {
        speaker.retrieve(1, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
         it('should remove speaker', function(done) {
        speaker.remove(1, function(err, result) {
            assert.equal(true, result);
            done();
        });
    });
    
    //testing all tags CRUD ops

             it('should create tags', function(done) {
        tags.create({"id":6, "genre":"Literature"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
        
         it('should update tags', function(done) {
        tags.update({"id":2, "genre":"Computing"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
         it('should retrieve a tag', function(done) {
        tags.retrieve(1, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
         it('should remove a tag', function(done) {
        tags.remove(1, function(err, result) {
            assert.equal(true, result);
            done();
        });
    });
    
    
    //testing all lecture CRUD ops

                 it('should create lectures', function(done) {
        lecture.create({id:4, title: "Buttercup", venue_id:1, speaker_id:3, date:"07 Sep 2015", time:"18:00", tags_id:3}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
     
    
         it('should update lectures', function(done) {
        lecture.update({"id":2, "title": "Funk Warrior", "venue_id":3, "speaker_id": null, "date": "07 Sep 2015", "time": "18:00", "tags_id":3}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
    
    
         it('should retrieve a lecture', function(done) {
        lecture.retrieve(1, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
    
         it('should remove a lecture', function(done) {
        lecture.remove(2, function(err, result) {
            assert.equal(true, result);
            done();
        });
    });
    
    
});
