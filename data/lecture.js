var pg = require('pg');
var connectionString = 'postgres://localhost:5432/talks';

exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Insert
        client.query("insert into lecture(title, venue_id, speaker_id, date, time) select cast($1 as varchar), $2, $3, cast($4 as date), cast($5 as time) where not exists (select 1 from lecture where title=$1 and date=$4 and time=$5) returning id", [data.title, data.venue_id, data.speaker_id, data.date, data.time], function(err, result) {
            //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(err, result.rows[0]);
            }
        });
    });
};

exports.retrieve = function(id, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // select
        var query = client.query("select * from lecture where id = ($1)", [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            //client.end();
            done();
            callback(null, result[0]);
        });

        handleError(err, client, callback);
    });
};

exports.update = function(data, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Update
        client.query("update lecture set title=($2), venue_id=($3), speaker_id=($4), date=($5), time=($6) where id=($1)", [data.id, data.title, data.venue_id, data.speaker_id, data.date, data.time]);

        // Select
        var query = client.query("select * from lecture where id = ($1)", [data.id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            //client.end();
            done();
            callback(null, result[0]);
        });

        handleError(err, client, callback);
    });
};

exports.remove = function(id, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Delete
        client.query("delete from lecture where id=($1)", [id]);
                        // Select
        var query = client.query("select * from lecture where id = ($1)", [id], function(err) {
            //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(null, true);
            }
        });

        handleError(err, client, callback);
    });
};

function handleError(err, client, callback) {
    if(err) {
        client.end();
        callback(err);
    }
}

