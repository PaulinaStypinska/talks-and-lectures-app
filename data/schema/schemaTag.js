var pg = require('pg');

var createTagTable = 'create table tag \ \
                  ( \
                    id int primary key, \
                    genre varchar(40) not null \
                  )';

exports.drop = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists tag cascade', function(err, result) {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query(createTagTable, function(err, result) {
            if(!err) {
                console.log('Created Tags Table');
            }
            client.end();
            callback(err, result);
        });
    });
}
