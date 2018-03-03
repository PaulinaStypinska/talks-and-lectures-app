const { Pool, Client } = require('pg')

const connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';

const pool = new Pool({
    connectionString: connectionString,
  });
//requires dotenv and splits config for clarity
var dotenv = require('dotenv');

exports.create = (data, callback) => {
    // Get a client from the connection pool
    pool.connect((err, client, done) => {
        // Insert
        client.query("insert into tag(genre, eventbrite_id,eventbrite, meetup_id,meetup) select cast($1 as varchar), " +
            "$2, $3, $4, $5 where not exists (select 1 from tag where genre=$1) returning tid",
            [data.genre, data.eventbrite_id, data.eventbrite, data.meetup_id, data.meetup], (err, result) => {
            //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(err, result.rows[0]);
            }
        });
    });
}

exports.retrieve = (callback) => {
    pool.connect((err, client, done) => {
        // select
        client.query("select * from tag ORDER BY tid ASC;")
        .then((res) => {
            done();
            callback(null, res.rows);
        })
        .catch((err) => {
            handleError(err, client, callback);
        });
    });
}

exports.update = (data, callback) => {
    var result = [];
    // Get a client from the connection pool
    pool.connect((err, client, done) => {
        client.query("update tag set genre=($2) where tid=($1)", [data.id, data.genre])
        .then(() => {
            return client.query("select * from tag where tid = ($1)", [data.id]);
        })
        .then((res) => {
            result.push(res.rows[0]);
            done();
            callback(null, result[0]);
        })
        .catch((e) => {
            handleError(err, client, callback);
        });

    });
}

exports.remove = (id, callback) => {
    var result = [];
    // Get a client from the connection pool
    pool.connect(connectionString, (err, client, done) => {
        // Delete
        client.query("delete from tag where tid=($1)", [id]);

        // Select
        var query = client.query("select * from tag where tid = ($1)", [id], (err) => {
           // client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(null, true);
            }
        });

        handleError(err, client, callback);
    });
}

function handleError(err, client, callback) {
    if(err) {
        client.end();
        callback(err);
    }
}

