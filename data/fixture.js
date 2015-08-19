var pg = require('pg');
var async = require('async');
var talks = require('./talks.json'); //now references the joint json file (renamed talks, previous file still kept as they are for reference)
var util = require('util');

exports.createFixtures = function (databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function (err, client) {
        if (err) throw err;
        deleteAll(client, function(err, result) { //deletes both venues and lectures
            createVenues(client, talks.venues, function(err, result) {//creates venues
            })
            
             createTags(client, talks.tags, function(err, result) {//creates tags
            })
            
             createSpeakers(client, talks.speakers, function(err, result) {//creates speakers
            })   
            
            createLectures(client, talks.lectures, function (err, result) { //creates lectures and inserts the foreign key
             callback(); //only calls callback (=done()) after creating lectures
            });
        });     // Call other create functions in the correct order
    });
}

function deleteAll(client, callback) {
  client.query('delete from lectures', function(err, result) { 
      console.log('Deleted all lectures'); 
      //doesn't call callback, so that createVenues and createLectures isn't called twice
    });
    
      client.query('delete from tags', function(err, result) { 
      console.log('Deleted all tags'); 
      //doesn't call callback, so that createVenues and createLectures isn't called twice
    });
    
      client.query('delete from speaker', function(err, result) { 
      console.log('Deleted all speakers'); 
      //doesn't call callback, so that createVenues and createLectures isn't called twice
    }); 
    
  //  should work in this order if on delete cascade and on delete update is specified when creating the foreign key
      client.query('delete from venues', function (err, result) {
      console.log('Deleted all venues');
       callback(err, result);
    });
        // Delete contents of other tables
}

function createVenues(client, venues, callback) {
    async.each(venues, function(venue, callback) {
        client.query('insert into venue(id, name, building, street, number, postcode) values($1, $2, $3, $4, $5, $6)', [venue.id, venue.name, venue.building, venue.street, venue.number, venue.postcode], function(err, result) { //to change to reference the deeper json structure
            callback(err, result);
            console.log('Inserted venue: ' + util.inspect(venue));
        });
    }, function (err) {
        if(err) {
            console.log('Failed to insert Venue');
        }
        callback(err);
    });
}
//creates lectures

function createLectures(client, lectures, callback) {
    async.each(lectures, function (lecture, callback) {
        client.query('insert into lectures(id, title, venue_id, speaker_id, date, time, tags_id) values($1, $2, $3, $4, $5, $6, $7)', [lecture.id, lecture.title, lecture.venue_id, lecture.speaker_id, lecture.date, lecture.time, lecture.tags_id], function (err, result) { 
            callback(err, result);
            console.log('Inserted lecture: ' + util.inspect(lecture));
        });
    }, function (err) {
        if (err) {
            console.log('Failed to insert a lecture');
        }
        callback(err);
    });
}

function createTags(client, tags, callback) {
    async.each(tags, function(tag, callback) {
        client.query('insert into tags(id, genre) values($1, $2)', [tag.id, tag.genre], function(err, result) { //to change to reference the deeper json structure
            callback(err, result);
            console.log('Inserted tag: ' + util.inspect(tag));
        });
    }, function(err){
        if(err) {
          console.log('Failed to insert tag');
        }
       callback(err);
    });
}

function createSpeakers(client, speakers, callback) {
    async.each(speakers, function(speaker, callback) {
        client.query('insert into speaker(id, firstname, lastname, bio) values($1, $2, $3, $4)', [speaker.id, speaker.firstname, speaker.lastname, speaker.bio], function(err, result) { 
            callback(err, result);
            console.log('Inserted speaker: ' + util.inspect(speaker));
        });
    }, function(err){
        if(err) {
            console.log('Failed to insert speaker');
        }
        callback(err);
    });
}


