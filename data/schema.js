var pg = require('pg');

var createVenueTable = 'create table venue \ \
                  ( \
                    id serial primary key, \
                    name varchar(40) not null, \
                    building varchar(40)  not null, \
                    street varchar(40) not null,\
                    number int not null, \
                    postcode varchar(40) not null \
                  )';

exports.createSchema = function(databaseName, callback) {
    var connectionString = 'postgres://orator:password@localhost/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists venue', function(err, result) {
            client.query(createVenueTable, function(err, result) {
                callback(err, result);
            });
        })
    });
}
