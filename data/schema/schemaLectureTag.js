var pg = require('pg');

var createLectureTable = 'create table lecturetag \ \
                  ( \
                    id int primary key, \
                    lecture_id int not null references lecture(id) on delete cascade, \
                    tag_id int references tag(id) on delete cascade \
                  )';

exports.drop = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists lecturetag cascade', function(err, result) {
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
                console.log('Created LectureTag Table');
            }
            client.end();
            callback(err, result);
        });
    });
}


