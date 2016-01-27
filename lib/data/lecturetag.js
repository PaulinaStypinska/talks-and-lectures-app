var pg = require('pg');
var connectionString = require('../constring').connectionString;

exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Insert
        client.query("insert into lecturetag(lecture_id, tag_id) select cast($1 as int), cast($2 as int) where not exists (select 1 from lecturetag where lecture_id=$1 and tag_id=$2) returning id", [data.lecture_id, data.tag_id], function(err, result) {
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
        var query = client.query("select * from lecturetag where id = ($1)", [id]);

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
        client.query("update lecturetag set lecture_id=($2), tag_id=($3) where id=($1)", [data.id, data.lecture_id, data.tag_id]);

        // Select
        var query = client.query("select * from lecturetag where id = ($1)", [data.id]);

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
        client.query("delete from lecturetag where id=($1)", [id]);

        // Select
        var query = client.query("select * from lecturetag where id = ($1)", [id], function(err) {
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

