var pg = require('pg');

var createVenueTable = 'create table venue \ \
                  ( \
                    id int primary key, \
                    name varchar(40) not null, \
                    building varchar(40), \
                    street varchar(40),\
                    number int, \
                    postcode varchar(20) \
                  )';

exports.drop = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists venue cascade', function(err, result) {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query(createVenueTable, function(err, result) {
            if(!err) {
                console.log('Created Venue Table');
            }
            client.end();
            callback(err, result);
        });
    });
}
