var pg = require('pg');
var async = require('async');
var lectures = require('./lectures.json');
var util = require('util');

exports.createFixtures = function(databaseName, callback) {
    var connectionString = 'postgres://orator:password@localhost/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        deleteAll(client, function(err, result) {
            createLectures(client, lectures, function(err, result) {
                callback();
            });
        });
    });
}

function deleteAll(client, callback) {
    client.query('delete from lecture', function(err, result) {
        console.log('Deleted all Lectures');
        callback(err, result);
    });
}

function createLectures(client, lectures, callback) {
    async.each(lectures, function(lecture, callback) {
        client.query('insert into lectures(title, venue, speaker, date, time) values($1, $2, $3, $4, $5)', [lecture.title, lecture.venue, lecture.speaker, lecture.date, lecture.time], function(err, result) {
            callback(err, result);
            console.log('Inserted lecture: ' + util.inspect(lecture));
        });
    }, function(err){
        if(err) {
            console.log('Failed to insert Lecture');
        }
        callback(err);
    });
}


