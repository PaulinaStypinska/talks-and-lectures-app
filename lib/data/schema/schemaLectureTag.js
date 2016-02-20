var pg = require('pg');
//requires dotenv and splits config for clarity
var dotenv = require('dotenv');
dotenv.config({path:'.env'});



var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5433/talks';

var createLectureTagTable = 'create table lecturetag \ \
                  ( \
                    id int primary key not null, \
                    lecture_id int not null references lecture(lid) on delete cascade, \
                    tag_id int references tag(tid) on delete cascade \
                      );\
                        drop sequence if exists lecturetag_id_seq;\
                        create sequence lecturetag_id_seq;\
                      alter table lecturetag alter column id set default nextval(\'lecturetag_id_seq\')';
                      

exports.drop = function(databaseName, callback) {
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists lecturetag cascade', function(err, result) {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = function(databaseName, callback) {
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query(createLectureTagTable, function(err, result) {
            if(!err) {
                console.log('Created LectureTag Table');
            }
            client.end();
            callback(err, result);
        });
    });
}


