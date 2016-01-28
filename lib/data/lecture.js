var pg = require('pg');
//var connection = require('../../constring.js').connectionString;
//var connectionString = connection || 'postgres://localhost:5432/talks';
var connectionString = 'postgres://localhost:5432/talks';
    
exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Insert
        client.query("insert into lecture(title, venue_id, tag_id, datetime, url, description) select cast($1 as varchar), (select id from venue where venue.name=$5),(select id from tag where tag.eventbrite=$6 or tag.meetup=$6), cast($2 as timestamp), cast ($3 as text), $4 where not exists (select * from lecture where title=$1 and datetime=$2) returning id", [data.title, data.datetime, data.url, data.description, data.name, data.category], function(err, result) {
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

exports.retrieve = function(callback) {
  var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // select
        var query = client.query("SELECT * FROM lecture INNER JOIN venue ON lecture.venue_id = venue.id ORDER BY lecture.id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            //client.end();
            callback(null, true);
        });

        handleError(err, client, callback);
    });
};

exports.update = function(data, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Update
        client.query("update lecture set title=($2), venue_id=($3), tag_id=($4), datetime=($5), url=($6), description=($7) where id=($1)", [data.id, data.title, data.venue_id, data.tag_id, data.datetime, data.url, data.description]);

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

