var pg = require('pg');

var createTagTable = 'create table tag \ \
                  ( \
                    id int primary key not null, \
                    genre varchar(40) not null \
                  );\
                    drop sequence if exists tag_id_seq;\
                    create sequence tag_id_seq;\
                    alter table tag alter column id set default nextval(\'tag_id_seq\')';

exports.drop = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('alter sequence if exists tag_id_seq restart with 1; drop table if exists tag cascade', function(err, result) {
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
