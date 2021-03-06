var { Pool, Client } = require('pg')

var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';

var pool = new Pool({
    connectionString: connectionString,
  });

var createLectureTable = 'create table lecture \ \
                       ( \
                        lid int primary key not null, \
                        title text not null, \
                        venue_id int references venue(vid) on delete set null, \
                        tag_id int references tag(tid) on delete set null not null, \
                        datetime timestamp, \
                        url text, \
                        description text, \
                        UNIQUE (url, datetime)\
                      );\
                      drop sequence if exists lecture_lid_seq;\
                      create sequence lecture_lid_seq;\
                      alter table lecture alter column lid set default nextval(\'lecture_lid_seq\')';
                      

exports.drop = (databaseName, callback) => {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('drop table if exists lecture cascade', (err, result) => {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = (databaseName, callback) => {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query(createLectureTable, (err, result) => {
            if(!err) {
                console.log('Created Lecture Table');
            }
            client.end();
            callback(err, result);
        });
    });
}


