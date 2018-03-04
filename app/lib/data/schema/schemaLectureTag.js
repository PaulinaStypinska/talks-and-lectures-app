var { Pool, Client } = require('pg')

var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';

var pool = new Pool({
    connectionString: connectionString,
  });
var createLectureTagTable = 'create table lecturetag \ \
                  ( \
                    id int primary key not null, \
                    lecture_id int not null references lecture(lid) on delete cascade, \
                    tag_id int references tag(tid) on delete cascade \
                      );\
                        drop sequence if exists lecturetag_id_seq;\
                        create sequence lecturetag_id_seq;\
                      alter table lecturetag alter column id set default nextval(\'lecturetag_id_seq\')';
                      

exports.drop = (databaseName, callback) => {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('drop table if exists lecturetag cascade', (err, result) => {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = (databaseName, callback) => {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query(createLectureTagTable, (err, result) => {
            if(!err) {
                console.log('Created LectureTag Table');
            }
            client.end();
            callback(err, result);
        });
    });
}


