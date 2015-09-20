
// force the test environment to 'test'
process.env.NODE_ENV = 'test';
var assert = require('assert');
var async = require('async');

//schemas
var lectureschema = require('../data/schema/schemaLecture');
var venueschema = require('../data/schema/schemaVenue');
var speakerschema = require('../data/schema/schemaSpeaker');
var tagschema = require('../data/schema/schemaTag');
var linkschema = require('../data/schema/schemaLectureTag');
//fixtures file
var fixtures = require('../data/fixture');

//all CRUD modules
var venue = require('../data/venue');
var speaker = require('../data/speaker');
var tags = require('../data/tag');
var lecture = require('../data/lecture');
var lectureTag = require('../data/lecturetag');

var databaseName = 'talks';

describe('crud test', function() {

    // Run once before all tests
    before(function(done) {
        async.series([
            function(callback) {
                fixtures.dropAll(databaseName, function(err, result) {
                    callback(err, result);
                })
            },
            function(callback) {
                fixtures.createAll(databaseName, function(err, result) {
                    callback(err, result);
                })
            },
            function(callback) {
                fixtures.createFixtures(databaseName, function(err, result) {
                    callback(err, result);
                })
            }],
            function(err, results) {
                if(err) {
                    console.log(err);
                }
                done();
            });
    });

    //testing all venues CRUD operations
    it('should create venues', function(done) {
        venue.create({"name":"Piccadilly", "building": "lecture hall 05", "street": "Lower Marsh", "longitude": "0.0109", "latitude": "52.1212"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });

/*

    it('should retrieve venues', function(done) {
        venue.retrieve(1, function(err, result) {
            console.log(result);
            assert.equal(true, result.id > 0);
            done();
        });
    });
   
        it('should update venues', function(done) {
        venue.update({"id":2, "name":"St Andrew's", "building": "lecture hall 04", "street": "Shoreditch High Street", "longitude": "0.0102", "latitude": "52.3456"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });

    it('should remove a venue', function(done) {
        venue.remove(4, function(err, result) {
            assert.equal(true, result);
            done();
        });
    });
    

    //testing all speaker CRUD ops
    it('should create speaker', function(done) {
        speaker.create({"firstname": "Ava", "lastname": "DuVernay", "bio": "bio3"}, function(err, result) {
            if(err) {
                console.log(err);
            }
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
        tags.create({"genre":"Literature"}, function(err, result) {
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
        lecture.create({title: "Buttercup", venue_id:1, speaker_id:3, date:"07 Sep 2015", time:"18:00"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });

    it('should update lectures', function(done) {
        lecture.update({"id":2, "title": "Funk Warrior", "venue_id":3, "speaker_id": null, "date": "07 Sep 2015", "time": "18:00"}, function(err, result) {
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
    
    it('should insert a tag and lecture connection', function(done) {
        lectureTag.create({"lecture_id": 1, "tag_id":3}, function (err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
  */ 
    
});
