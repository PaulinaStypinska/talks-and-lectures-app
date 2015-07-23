var pg = require('pg');
var connectionString = 'postgres://localhost:5432/talks';

function create(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client) {
        // Insert
        client.query("insert into venue(name) values($1) returning id", [data.name], function(err, result) {
            client.end();
            if(err) {
                callback(err);
            } else {
                callback(err, result.rows[0]);
            }
        });
    });
}

function retrieve(id, callback) {
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

function update(data, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client) {
        // Update
        client.query("update venue set name=($2) where id=($1)", [data.id, data.name]);

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

function remove(id, callback) {
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

// These ugly tests will only work with the correct data in the database
// We will replace these with proper tests

//create({name:"scooby"}, function(err, result) {
//    console.log(result);
//});

//retrieve(8, function(err, result) {
//    console.log(result);
//});

//update({id:8, name:"Albert Hall"}, function(err, result) {
//    console.log(result);
//});

//remove(30, function(err, result) {
//    console.log(result);
//});