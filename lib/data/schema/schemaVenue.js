var pg = require('pg');
var connection = require('../../constring.js').connectionString;
var connectionString = connection || 'postgres://localhost:5432/talks';

var createVenueTable = 'create table venue \ \
                  ( \
                    id int primary key not null, \
                    name varchar(60) not null, \
                    building varchar(40), \
                    street varchar(60),\
                    longitude numeric(6,4), \
                    latitude numeric(6,4) \
                  );\
                    drop sequence if exists venue_id_seq;\
                    create sequence venue_id_seq;\
                    alter table venue alter column id set default nextval(\'venue_id_seq\')';
                    
                    

exports.drop = function(databaseName, callback) {
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists venue cascade', function(err, result) {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = function(databaseName, callback) {
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
