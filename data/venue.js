var pg = require('pg');
var connectionString = 'postgres://localhost:5432/talks';

exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Insert. Changed to select where not exists to avoid duplicates and used cast() to get the correct data type (throws error otherwise)
        client.query("insert into venue(name, building, street, longitude, latitude) select $1, $2, cast($3 as varchar), $4, $5 where not exists (select 1 from venue where street=$3) returning id", [data.name, data.building, data.street, data.longitude, data.latitude], function(err, result) {
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
        client.query('with upsert as (update venue set name=$1, building=$2, longitude=$4, latitude=$5 where street=$3 returning *) insert into venue(name, building, street, longitude, latitude) select $1,$2,$3,$4,$5 where not exists (select * from upsert) returning id', [data.name, data.building, data.street, data.longitude, data.latitude], function(err, result) {
           //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(null, true);
            }
        });
    });
}

exports.retrieve = function(id, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // select
        var query = client.query("select * from venue where id = ($1)", [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            //client.end();
            callback(null, result[0]);
        });

        handleError(err, client, callback);
    });
}

exports.update = function(data, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Update
        client.query("update venue set name=($2), building=($3), street=($4), longitude=($5), latitude=($6) where id=($1)", [data.id, data.name, data.building, data.street, data.longitude, data.latitude]);

        // Select
        var query = client.query("select * from venue where id = ($1)", [data.id]);

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
        client.query("delete from venue where id=($1)", [id]);

        // Select
        var query = client.query("select * from venue where id = ($1)", [id], function(err) {
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

