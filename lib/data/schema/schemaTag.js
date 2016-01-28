var pg = require('pg');
var connection = require('../../constring.js').connectionString;
//var connectionString = 'postgres://localhost:5432/talks' || connection;
var connectionString = 'postgres://localhost:5432/talks';

var createTagTable = 'create table tag \ \
                  ( \
                    id int primary key not null, \
                    eventbrite varchar(40) not null \
                  );\
                    drop sequence if exists tag_id_seq;\
                    create sequence tag_id_seq;\
                    alter table tag alter column id set default nextval(\'tag_id_seq\')';

exports.drop = function(databaseName, callback) {
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists tag cascade', function(err, result) {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = function(databaseName, callback) {
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
