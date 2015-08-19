var pg = require('pg');
var connectionString = 'postgres://localhost:5432/talks';

exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client) {
        // Insert
        client.query("insert into speaker(id, firstname, lastname, bio) values($1, $2, $3, $4) returning id", [data.id, data.firstname, data.lastname, data.bio], function(err, result) {
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
        var query = client.query("select * from speaker where id = ($1)", [id]);

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
        client.query("update speaker set firstname=($2), lastname=($3), bio=($4) where id=($1)", [data.id, data.firstname, data.lastname, data.bio]);

        // Select
        var query = client.query("select * from speaker where id = ($1)", [data.id]);

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
        client.query("delete from speaker where id=($1)", [id]);

        // Select
        var query = client.query("select * from speaker where id = ($1)", [id], function(err) {
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

