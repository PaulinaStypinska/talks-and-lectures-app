// force the test environment to 'test'
process.env.NODE_ENV = 'test';
var assert = require('assert');
var async = require('async');

//schemas
var lectureschema = require('../lib/data/schema/schemaLecture');
var venueschema = require('../lib/data/schema/schemaVenue');
var speakerschema = require('../lib/data/schema/schemaSpeaker');
var tagschema = require('../lib/data/schema/schemaTag');
var linkschema = require('../lib/data/schema/schemaLectureTag');
//fixtures file
var fixtures = require('../lib/data/fixture');

//all CRUD modules
var venue = require('../lib/data/venue');
var speaker = require('../lib/data/speaker');
var tags = require('../lib/data/tag');
var lecture = require('../lib/data/lecture');
var lectureTag = require('../lib/data/lecturetag');

var databaseName = 'talks';

describe('crud test', function() {

    // Run once before all tests
    before(function(done) {
        this.timeout(0);
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
        venue.create({"name":"Piccadilly", "address1": "lecture hall 05", "address2": "Lower Marsh", "post_code":"SE8 IR9","longitude": "0.0109", "latitude": "52.1212"}, function(err, result) {
            assert.equal(true, result.vid > 0);
            done();
        });
    });

    //testing all venues CRUD operations
    it('should upsert venues', function(done) {
        venue.upsert({"name":"Piccadilly", "address1": "lecture hall 12", "address2": "Castle Hohenzollern", "post_code":"SE8 IWS","longitude": "0.0109", "latitude": "52.1212"}, function(err, result) {
            assert.equal(true, result.vid > 0);
            done();
        });
    });


    it('should retrieve venues', function(done) {
        venue.retrieve(function(err, result) {
            console.log(result);
            assert.equal(true, result[1].vid > 0);
            done();
        });
    });
   
        it('should update venues', function(done) {
        venue.update({"id":2, "name":"St Andrew's", "address1": "lecture hall 04", "address2": "Shoreditch High Street","post_code":"WR6 IJ0", "longitude": "0.0102", "latitude": "52.3456"}, function(err, result) {
            assert.equal(true, result.vid > 0);
            done();
        });
    });

 
    //testing all tags CRUD ops
    it('should create tags', function(done) {
        tags.create({"genre":"Literature", "eventbrite_id": ["11"], "eventbrite": ["Culture"],"meetup_id":[12], "meetup": ["Culture & Social"]}, function(err, result) {
            assert.equal(true, result.tid > 0);
            done();
        });
    });

    it('should update tags', function(done) {
        tags.update({"id":2, "genre":"Computing", "eventbrite_id":["32"], "eventbrite": "Computers","meetup_id":[45], "meetup": "Technology"}, function(err, result) {
            assert.equal(true, result.tid > 0);
            done();
        });
    });

    it('should retrieve a tag', function(done) {
        tags.retrieve(1, function(err, result) {
            assert.equal(true, result.tid > 0);
            done();
        });
    });


    //testing all lecture CRUD ops
   it('should create lectures', function(done) {
        lecture.create({title: "Buttercup", datetime:"1999-01-08 04:05:06 -5:00", url:"www.google.com", description: "Description 4", name: "The O2", category_id:6}, function(err, result) {
            assert.equal(true, result.lid > 0);
            done();
        });
    });
   it('should upsert lectures', function(done) {
        lecture.upsert({title: "Buttercup", datetime:"1999-01-08 04:05:06 -7:00", url:"www.buzzfeed.com", description: "Description 56", name: "Piccadilly", category_id:2}, function(err, result) {
            assert.equal(true, result.lid > 0);
            done();
        });
    });

    it('should retrieve a lecture', function(done) {
        lecture.retrieve(function(err, result) {
            assert.equal(true, result[1].lid > 0);
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