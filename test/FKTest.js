// force the test environment to 'test'
process.env.NODE_ENV = 'test';
var assert = require('assert');
var lectureschema = require('../data/schemaL');
var lecturefixtures = require('../data/fixtureL');
var lecture = require('../data/lecture');
var venueschema = require('../data/schema');
var venuefixtures = require('../data/fixture');
var venue = require('../data/venue');

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
                lectureschema.createSchema(databaseName, function(err, result) {
            done();
    })
    });
//just for this, to test the foreign key, I'll have it run once
    before(function(done) {
        venuefixtures.createFixtures(databaseName, function(err, result) {
            done();
        })
    });
        // Run once before each test

    beforeEach(function(done) {
        lecturefixtures.createFixtures(databaseName, function(err, result) {
            done();
        });   
    });
    it('should create venue', function(done) {
        venue.create({name:'Test Venue', building:"lecture hall 04", street: "Blackfriars Road", number: "122", postcode: "E1"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
     it('should create lectures', function(done) {
        lecture.create({title: "Another one", venue: "Albert Hall", speaker: "Hannibal Lecter", date: "08 Sep 2015", time: "12:00"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });


});