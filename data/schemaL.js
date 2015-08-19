var pg = require('pg');

var createLectureTable = 'create table lectures \ \
                  ( \
                    id int primary key, \
                    title varchar(40) not null, \
                    venue_id int references venue(id) on delete set null, \
                    speaker_id int references speaker(id) on delete set null, \
                    date date, \
                    time time, \
                    tags_id int references tags(id) on delete set null \
                  )';

exports.createSchema = function(databaseName, callback) {
    var connectionString = 'postgres://localhost:5432/' + databaseName;
    pg.connect(connectionString, function(err, client) {
        if (err) throw err;
        client.query('drop table if exists lectures', function(err, result) {
            client.query(createLectureTable, function(err, result) {
                callback(err, result);
            });
        })
    });
}
