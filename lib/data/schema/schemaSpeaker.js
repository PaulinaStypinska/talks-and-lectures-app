var pg = require('pg');
//requires dotenv and splits config for clarity
var dotenv = require('dotenv');
dotenv.config({path:'.env'});



var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';

var createSpeakerTable = 'create table speaker \ \
                  ( \
                    id int primary key not null, \
                    firstname varchar(40) not null, \
                    lastname varchar(40) not null, \
                    bio varchar(300) \
                  );\
                    drop sequence if exists speaker_id_seq;\
                    create sequence speaker_id_seq;\
                    alter table speaker alter column id set default nextval(\'speaker_id_seq\')';

exports.drop = function(databaseName, callback) {
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists speaker cascade', function(err, result) {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = function(databaseName, callback) {
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query(createSpeakerTable, function(err, result) {
            if(!err) {
                console.log('Created Speaker Table');
            }
            client.end();
            callback(err, result);
        });
    });
}
