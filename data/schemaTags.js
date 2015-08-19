var pg = require('pg');

var createTagTable = 'create table tags \ \
                  ( \
                    id int primary key, \
                    genre varchar(40) not null \
                  )';

exports.createSchema = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists tags', function(err, result) {
            client.query(createTagTable, function(err, result) {
                callback(err, result);
            });
        })
    });
}
