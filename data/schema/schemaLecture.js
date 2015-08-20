var pg = require('pg');

var createLectureTable = 'create table lecture \ \
                  ( \
                    id int primary key, \
                    title varchar(40) not null, \
                    venue_id int references venue(id) on delete set null, \
                    speaker_id int references speaker(id) on delete set null, \
                    date date, \
                    time time, \
                    tag_id int references tag(id) on delete set null \
                  )';

exports.drop = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists lecture cascade', function(err, result) {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
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


