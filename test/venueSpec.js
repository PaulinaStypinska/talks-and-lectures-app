// force the test environment to 'test'
process.env.NODE_ENV = 'test';
var assert = require('assert');
var schema = require('../data/schema');
var fixtures = require('../data/fixture');
var venue = require('../data/venue');

var databaseName = 'talks';

describe('venue test', function() {

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

    it('should create venue', function(done) {
        venue.create({name:'Test Venue', building: "Brewery", stree: 'Russel Sq', number:30, postcode: "SE1"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
});