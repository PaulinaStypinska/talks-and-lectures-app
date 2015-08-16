var pg = require('pg');

var createLectureTable = 'create table lectures \ \
                  ( \
                    id serial primary key, \
                    title varchar(40) not null, \
                    venue varchar(40), \
                    speaker varchar(40), \
                    date date not null, \
                    time time not null \
                  )';

exports.createSchema = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists lectures', function(err, result) {
            client.query(createLectureTable, function(err, result) {
                callback(err, result);
            });
        })
    });
}
