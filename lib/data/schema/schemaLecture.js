var pg = require('pg');
var connection = require('../../constring.js').connectionString;
//var connectionString = 'postgres://localhost:5432/talks' || connection;
var connectionString = 'postgres://localhost:5432/talks';

var createLectureTable = 'create table lecture \ \
                       ( \
                        id int primary key not null, \
                        title varchar(40) not null, \
                        venue_id int references venue(id) on delete set null, \
                        tag_id int references tag(id) on delete set null, \
                        datetime timestamp, \
                        url text, \
                        description text \
                      );\
                      drop sequence if exists lecture_id_seq;\
                        create sequence lecture_id_seq;\
                      alter table lecture alter column id set default nextval(\'lecture_id_seq\')';
                      


exports.drop = function(databaseName, callback) {
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists lecture cascade', function(err, result) {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = function(databaseName, callback) {
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query(createLectureTable, function(err, result) {
            if(!err) {
                console.log('Created Lecture Table');
            }
            client.end();
            callback(err, result);
        });
    });
}


