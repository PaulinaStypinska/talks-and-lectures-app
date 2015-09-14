var pg = require('pg');
var connectionString = 'postgres://localhost:5432/talks';

exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Insert; cast is a workaround since there is a data type error when same data is used twice. where indicates when duplicates should be omitted.
        client.query("insert into venue(id, name, building, street, longitude, latitude) select $1, $2, $3, cast($4 as varchar), $5, $6 where not exists (select 1 from venue where street=$4) returning id", [data.id, data.name, data.building, data.street, data.longitude, data.latitude], function(err, result) { 
           // client.end();
            done(); //calls done since end method limits the client pool to 10 at the time and this limits the bulk insert, done seems to release the connection immediately. should client.end() still be called within this function?
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
        var query = client.query("select * from venue where id = ($1)", [id]);

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
        client.query("update venue set name=($2), building=($3), street=($4), longitude=($5), latitude=($6) where id=($1)", [data.id, data.name, data.building, data.street, data.longitude, data.latitude]);

        // Select
        var query = client.query("select * from venue where id = ($1)", [data.id]);

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
        client.query("delete from venue where id=($1)", [id]);

        // Select
        var query = client.query("select * from venue where id = ($1)", [id], function(err) {
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

