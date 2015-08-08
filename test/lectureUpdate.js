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

    it('should update lectures', function(done) {
        lecture.update({'id': 2, 'title': "Mac'n'Cheese"}, function(err, result) {
            assert.equal(true, result.id > 0);
            done();
        });
    });
});