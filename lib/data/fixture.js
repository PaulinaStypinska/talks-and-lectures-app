var pg = require('pg');
var async = require('async');
var talks = require('./talk.json'); //now references the joint json file (renamed talks, previous file still kept as they are for reference)
var util = require('util');
//requires dotenv and splits config for clarity
var dotenv = require('dotenv');
//have to configure path since env is in the root folder
dotenv.config({path:'.env'});


//schemas
var lectureschema = require('./schema/schemaLecture');
var venueschema = require('./schema/schemaVenue');
var speakerschema = require('./schema/schemaSpeaker');
var tagschema = require('./schema/schemaTag');
var linkSchema = require('./schema/schemaLectureTag');

exports.dropAll = function(databaseName, callback) {
    async.series([
        //no link table needed for now
        /*
            function (callback){
            linkSchema.drop(databaseName, function (err, result) {
                    callback(err, result);
                })
            },
            */
            function(callback) {
                lectureschema.drop(databaseName, function(err, result) {
                    callback(err, result);
                })
            },
            function(callback) {
                venueschema.drop(databaseName, function(err, result) {
                    callback(err, result);
                })
            },
            function(callback) {
                tagschema.drop(databaseName, function(err, result) {
                    callback(err, result);
                })
            }
        /*,
        //no speaker table needed for now
            function(callback) {
                speakerschema.drop(databaseName, function(err, result) {
                    callback(err, result);
                })
            }
            */
    ],
        function(err, results) {
            callback(err, results);
        });
}

exports.createAll = function(databaseName, callback) {
    async.series([
            function(callback) {
                venueschema.createSchema(databaseName, function(err, result) {
                    callback(err, result);
                })
            },
            function(callback) {
                tagschema.createSchema(databaseName, function(err, result) {
                    callback(err, result);
                })
            },
        /*
            function(callback) {
                speakerschema.createSchema(databaseName, function(err, result) {
                    callback(err, result);
                })
            },
            */
            function(callback) {
                lectureschema.createSchema(databaseName, function(err, result) {
                    callback(err, result);
                })
            }
        /*,
            function (callback) {
                linkSchema.createSchema(databaseName, function (err, result) {
                    callback(err, result);
                })
            }*/
            ],
        function(err, results) {
            callback(err, results);
        });
}

exports.createFixtures = function (databaseName, callback) {

var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';
    pg.connect(connectionString, function (err, client) {
        if (err) throw err;
        async.series([
            function(callback) {
                deleteAll(client, function(err, result) {
                    callback(err, result);
                })
            },
            function(callback) {
                createVenues(client, talks.venues, function(err, result) {
                    callback(err, result);
                })
            },
            function(callback) {
                createTags(client, talks.tags, function(err, result) {
                    callback(err, result);
                })
            },
            /*
            function(callback) {
                createSpeakers(client, talks.speakers, function(err, result) {
                    callback(err, result);
                })
            },*/
            function(callback) {
                createLectures(client, talks.lectures, function(err, result) {
                    callback(err, result);
                })
            }
            /*,
            function(callback) {
                createLectureTag(client, talks.lecturetags, function(err, result)  {
                    callback(err, result);
                })
            }*/
            ],
            function(err, results) {
                callback(err, results);
            });
    });
}

function deleteAll(client, callback) {

    //  should work in this order if on delete cascade and on delete update is specified when creating the foreign key
    async.series([
            function (callback) {
                client.query('delete from lecturetag', function (err, result) {
                    console.log('deleted all link table data');
                    callback(err, result);
                });
            },
            function(callback) {
                client.query('delete from lecture', function(err, result) {
                    console.log('Deleted all Lectures');
                    callback(err, result);
                });
            },
            function(callback) {
                client.query('delete from tag', function(err, result) {
                    console.log('Deleted all Tags');
                    callback(err, result);
                });
            },
            function(callback) {
                client.query('delete from speaker', function(err, result) {
                    console.log('Deleted all Speakers');
                    callback(err, result);
                });
            },
            function(callback) {
                client.query('delete from venue', function (err, result) {
                    console.log('Deleted all Venues');
                    callback(err, result);
                });
            }],
            // Delete contents of other tables
            function(err, results) {
                callback();
            });
}

function createVenues(client, venues, callback) {
    async.each(venues, function(venue, callback) {
        client.query('insert into venue(name, address1, address2, post_code, longitude, latitude) values($1, $2, $3, $4, $5, $6)', [venue.name, venue.address1, venue.address2, venue.post_code, venue.longitude, venue.latitude], function(err, result) { //to change to reference the deeper json structure
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
        client.query('insert into lecture(title, venue_id, tag_id, datetime, url, description) values($1, $2, $3, $4, $5, $6)', [lecture.title, lecture.venue_id, lecture.tag_id, lecture.datetime, lecture.url, lecture.description], function (err, result) {
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
        client.query('insert into tag(genre, eventbrite_id, eventbrite, meetup_id, meetup) values($1, $2, $3, $4, $5)', [tag.genre, tag.eventbrite_id, tag.eventbrite, tag.meetup_id, tag.meetup], function(err, result) { //to change to reference the deeper json structure
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
        client.query('insert into speaker(firstname, lastname, bio) values($1, $2, $3)', [speaker.firstname, speaker.lastname, speaker.bio], function(err, result) { 
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


function createLectureTag(client, links, callback) {
    async.each(links, function(link, callback) {
        client.query('insert into lecturetag(lecture_id, tag_id) values($1, $2)', [link.lecture_id, link.tag_id], function(err, result) { //to change to reference the deeper json structure
            callback(err, result);
            console.log('Inserted lectureTag connection: ' + util.inspect(link));
        });
    }, function (err) {
        if(err) {
            console.log('Failed to insert lecture and tag connection');
        }
        callback(err);
    });
}


