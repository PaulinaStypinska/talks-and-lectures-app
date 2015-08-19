var pg = require('pg');
var connectionString = 'postgres://localhost:5432/talks';

exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client) {
        // Insert
        client.query("insert into lectures(id, title, venue_id, speaker_id, date, time, tags_id) values($1, $2, $3, $4, $5, $6, $7) returning id", [data.id, data.title, data.venue_id, data.speaker_id, data.date, data.time, data.tags_id], function(err, result) {
            client.end();
            if(err) {
                callback(err);
            } else {
                callback(err, result.rows[0]);
            }
        });
    });
}

exports.retrieve = function(id, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client) {
        // select
        var query = client.query("select * from lectures where id = ($1)", [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            callback(null, result[0]);
        });

        handleError(err, client, callback);
    });
}

exports.update = function(data, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client) {
        // Update
        client.query("update lectures set title=($2), venue_id=($3), speaker_id=($4), date=($5), time=($6), tags_id=($7) where id=($1)", [data.id, data.title, data.venue_id, data.speaker_id, data.date, data.time, data.tags_id]);

        // Select
        var query = client.query("select * from lectures where id = ($1)", [data.id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            callback(null, result[0]);
        });

        handleError(err, client, callback);
    });
}

exports.remove = function(id, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client) {
        // Delete
        client.query("delete from lectures where id=($1)", [id]);
                        // Select
        var query = client.query("select * from lectures where id = ($1)", [id], function(err) {
            client.end();
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

