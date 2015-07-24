var pg = require('pg');

var createVenueTable = 'create table venue \ \
                  ( \
                    id serial primary key, \
                    name varchar(40) not null \
                  )';

function createSchema(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        client.query('drop table if exists venue', function(err, result) {
            client.query(createVenueTable, function(err, result) {
                callback(err, result);
            });
        })
    });
}

createSchema('talks', function(err, result) {
    process.exit();
});