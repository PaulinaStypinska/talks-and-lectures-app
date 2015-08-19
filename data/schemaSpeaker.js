var pg = require('pg');

var createSpeakerTable = 'create table speaker \ \
                  ( \
                    id int primary key, \
                    firstname varchar(40) not null, \
                    lastname varchar(40) not null, \
                    bio varchar(300) \
                  )';

exports.createSchema = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists speaker', function(err, result) {
            client.query(createSpeakerTable, function(err, result) {
                callback(err, result);
            });
        })
    });
}
