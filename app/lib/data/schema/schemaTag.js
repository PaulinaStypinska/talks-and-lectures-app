var { Pool, Client } = require('pg')

var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';

var pool = new Pool({
    connectionString: connectionString,
  });
var createTagTable = 'create table tag \ \
                  ( \
                    tid int primary key not null, \
                    genre varchar(40) not null, \
                    eventbrite_id int[], \
                    eventbrite text[], \
                    meetup_id int[],\
                    meetup text[] \
                  );\
                    drop sequence if exists tag_tid_seq;\
                    create sequence tag_tid_seq;\
                    alter table tag alter column tid set default nextval(\'tag_tid_seq\')';

exports.drop = (databaseName, callback) => {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('drop table if exists tag cascade', (err, result) => {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = (databaseName, callback) => {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query(createTagTable, (err, result) => {
            if(!err) {
                console.log('Created Tags Table');
            }
            client.end();
            callback(err, result);
        });
    });
}
