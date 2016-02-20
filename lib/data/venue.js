var pg = require('pg');
//requires dotenv and splits config for clarity
var dotenv = require('dotenv');

dotenv.config({path:'.env'});


var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5433/talks';

exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Insert. Changed to select where not exists to avoid duplicates and used cast() to get the correct data type (throws error otherwise)

        
        client.query("insert into venue (name, address1, address2, post_code, longitude, latitude) select cast($1 as text), $2, cast($3 as text), cast($4 as text), $5, $6 where not exists (select * from venue where name=$1) returning vid", [data.name, data.address1, data.address2, data.post_code, data.longitude, data.latitude], function(err, result) {
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

exports.upsert = function(data, callback) {
    pg.connect(connectionString, function(err, client, done) {
        client.query("insert into venue (name, address1, address2, post_code, longitude, latitude) select $1, $2, $3, $4, $5, $6 ON CONFLICT (name) DO UPDATE SET (address1,address2,post_code, longitude, latitude) = ($2,$3,$4,$5,$6) returning vid", [data.name, data.address1, data.address2, data.post_code, data.longitude, data.latitude], function(err, result) {
           //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(null, result.rows[0]);
            }
        });
    });
}
//retrieves both venues and talks tables 
exports.retrieve = function(callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // select
        var query = client.query("SELECT DISTINCT ON (venue.vid) venue.*, to_json(ARRAY_AGG(row(lecture.lid,lecture.title))) as lectures FROM venue, lecture WHERE venue.vid=lecture.venue_id GROUP BY venue.vid;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            //client.end();
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
        client.query("update venue set name=($2), address1=($3), address2=($4), post_code=($5), longitude=($6), latitude=($7) where vid=($1)", [data.id, data.name, data.address1, data.address2, data.post_code, data.longitude, data.latitude]);

        // Select
        var query = client.query("select * from venue where vid = ($1)", [data.id]);

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
        client.query("delete from venue where vid=($1)", [id]);

        // Select
        var query = client.query("select * from venue where vid = ($1)", [id], function(err) {
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

