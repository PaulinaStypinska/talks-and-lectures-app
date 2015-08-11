var pg = require('pg');
var async = require('async');
var venues = require('./venues.json');
var util = require('util');

exports.createFixtures = function(databaseName, callback) {
    var connectionString = 'postgres://orator:password@localhost/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        deleteAll(client, function(err, result) {
            createVenues(client, venues, function(err, result) {
                callback();
            });
        });
    });
}

function deleteAll(client, callback) {
    client.query('delete from venue', function(err, result) {
        console.log('Deleted all Venues');
        callback(err, result);
    });
}

function createVenues(client, venues, callback) {
    async.each(venues, function(venue, callback) {
        client.query('insert into venue(name, building, street, number, postcode) values($1, $2, $3, $4,$5)', [venue.name, venue.building, venue.street, venue.number, venue.postcode], function(err, result) {
            callback(err, result);
            console.log('Inserted venue: ' + util.inspect(venue));
        });
    }, function(err){
        if(err) {
            console.log('Failed to insert Venue');
        }
        callback(err);
    });
}


