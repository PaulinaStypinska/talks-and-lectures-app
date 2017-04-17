var pg = require('pg');
//requires dotenv and splits config for clarity
var dotenv = require('dotenv');


var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';

exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Insert
        client.query("insert into tag(genre, eventbrite_id,eventbrite, meetup_id,meetup) select cast($1 as varchar), " +
            "$2, $3, $4, $5 where not exists (select 1 from tag where genre=$1) returning tid",
            [data.genre, data.eventbrite_id, data.eventbrite, data.meetup_id, data.meetup], function(err, result) {
            //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(err, result.rows[0]);
            }
        });
    });
}

exports.retrieve = function(callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // select
        var query = client.query("select * from tag ORDER BY tid ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
           // client.end();
            done();
            callback(null, result);
        });

        handleError(err, client, callback);
    });
}

exports.update = function(data, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Update
        client.query("update tag set genre=($2) where tid=($1)", [data.id, data.genre]);

        // Select
        var query = client.query("select * from tag where tid = ($1)", [data.id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
           // client.end();
            done();
            callback(null, result[0]);
        });

        handleError(err, client, callback);
    });
}

exports.remove = function(id, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Delete
        client.query("delete from tag where tid=($1)", [id]);

        // Select
        var query = client.query("select * from tag where tid = ($1)", [id], function(err) {
           // client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(null, true);
            }
        });

        handleError(err, client, callback);
    });
}

function handleError(err, client, callback) {
    if(err) {
        client.end();
        callback(err);
    }
}

