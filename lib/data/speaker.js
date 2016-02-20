var pg = require('pg');
//requires dotenv and splits config for clarity
var dotenv = require('dotenv');
dotenv.config({path:'.env'});



var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';

exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        //changted insert to reflect venue - avoiding duplicated when inserting data
        client.query("insert into speaker(firstname, lastname, bio) select cast($1 as varchar), cast($2 as varchar), $3 where not exists (select 1 from speaker where firstname=$1 and lastname=$2) returning id", [data.firstname, data.lastname, data.bio], function(err, result) {
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

exports.retrieve = function(id, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // select
        var query = client.query("select * from speaker where id = ($1)", [id]);

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
}

exports.update = function(data, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
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
            //client.end();
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
        client.query("delete from speaker where id=($1)", [id]);

        // Select
        var query = client.query("select * from speaker where id = ($1)", [id], function(err) {
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
}

function handleError(err, client, callback) {
    if(err) {
        client.end();
        callback(err);
    }
}

