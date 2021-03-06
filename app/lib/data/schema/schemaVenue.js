var { Pool, Client } = require('pg')

var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';

var pool = new Pool({
    connectionString: connectionString,
  });   
var createVenueTable = 'create table venue \ \
                  ( \
                    vid int primary key not null, \
                    name text not null, \
                    address1 text, \
                    address2 text,\
                    post_code text, \
                    longitude numeric(6,4), \
                    latitude numeric(6,4), \
                    UNIQUE (name)\
                  );\
                    drop sequence if exists venue_vid_seq;\
                    create sequence venue_vid_seq;\
                    alter table venue alter column vid set default nextval(\'venue_vid_seq\')';
                    
                    

exports.drop = (databaseName, callback) => {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('drop table if exists venue cascade', (err, result) => {
            client.end();
            callback(err, result);
        })
    });
}

exports.createSchema = (databaseName, callback) => {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query(createVenueTable, (err, result) => {
            if(!err) {
                console.log('Created Venue Table');
            }
            client.end();
            callback(err, result);
        });
    });
}
