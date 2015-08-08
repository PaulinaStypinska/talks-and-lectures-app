// force the test environment to 'test'
process.env.NODE_ENV = 'test';
var assert = require('assert');
var schema = require('../data/schemaL');
var fixtures = require('../data/fixtureL');
var lecture = require('../data/lecture');

var databaseName = 'talks';

describe('lecture test', function() {

    // Run once before all tests
    before(function(done) {
        // Create Schema
        schema.createSchema(databaseName, function(err, result) {
            done();
        });
    });

    // Run once before each test
    beforeEach(function(done) {
        fixtures.createFixtures(databaseName, function(err, result) {
            done();
        })
    });

    it('should create lectures', function(done) {
        lecture.create({"title": "Another one", "venue": "Albert Hall", "speaker": "Hannibal Lecter", "date": "08 Sep 2015", "time": "12:00"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
    it('should retrieve a lecture', function (done){
        lecture.retrieve(2,function (err, result){
        assert.equal(true, result.id > 0);
            done();
        });
    });
    it('should update a lecture', function (done){
        lecture.update({id:2, title: "Christmas Ghost Stories", venue: "St Bartholomew's Hospital", speaker: "Michael B. Jordan", date: "12 Dec 2015", time: "18:00"}, function (err, result){
        assert.equal(true, result.id > 0);
            done();
        });
    });
    
    it('should remove a lecture', function (done){
        lecture.remove(1, function (err, result){
        assert.equal(true, result);
            done();
        });
    });

});