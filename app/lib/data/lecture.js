var pg = require('pg');
//requires dotenv and splits config for clarity
var dotenv = require('dotenv');
//needs this path config to work in tests



var connectionString = process.env.DB_CONNECTION_STRING || 'postgres://localhost:5432/talks';
    
exports.create = function(data, callback) {
    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Insert
        client.query("insert into lecture(title, venue_id, tag_id, datetime, url, description) select cast($1 as varchar)," +
            "(select vid from venue where venue.name=$5),COALESCE((select tid from tag where $6=ANY(tag.eventbrite_id))," +
            "(select tid from tag where genre='Misc')), cast($2 as timestamp), cast ($3 as text), $4 where not exists" +
            " (select * from lecture where title=$1 and datetime=$2) returning lid",
            [data.title, data.datetime, data.url, data.description, data.name, data.category_id], function(err, result) {
            //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(err, result.rows[0]);
            }
        });
    });
};

//upserts data
exports.upsert = function(data, callback) {
    pg.connect(connectionString, function(err, client, done) {
        client.query("insert into lecture(title, venue_id, tag_id, datetime, url, description) select $1, " +
            "(select vid from venue where venue.name=$5), COALESCE((select tid from tag where $6=ANY(tag.eventbrite_id)" +
            " OR $6=ANY(tag.meetup_id)),(select tid from tag where genre='Misc')), cast($2 as timestamp),$3, $4 " +
            "ON CONFLICT (url, datetime) DO UPDATE SET (title,description, venue_id, tag_id)=" +
            "($1,$4,(select vid from venue where venue.name=$5),COALESCE((select tid from tag where " +
            "$6=ANY(tag.eventbrite_id) OR $6=ANY(tag.meetup_id)),(select tid from tag where genre='Misc'))) " +
            "returning lid", [data.title, data.datetime, data.url, data.description, data.name,
            data.category_id], function(err, result) {
           //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(null, result.rows[0]);
            }
        });
    });
}

exports.retrieve = function(callback) {
  var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // select
        var query = client.query("SELECT * FROM lecture INNER JOIN venue ON lecture.venue_id = venue.vid INNER JOIN tag ON lecture.tag_id = tag.tid ORDER BY lecture.datetime ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            //client.end();
            callback(null, result);
        });

        handleError(err, client, callback);
    });
};

exports.update = function(data, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Update
        client.query("update lecture set title=($2), venue_id=($3), tag_id=($4), datetime=($5), url=($6), description=($7) where lid=($1)", [data.id, data.title, data.venue_id, data.tag_id, data.datetime, data.url, data.description]);

        // Select
        var query = client.query("select * from lecture where lid = ($1)", [data.id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            //client.end();
            done();
            callback(null, result[0]);
        });

        handleError(err, client, callback);
    });
};

exports.remove = function(id, callback) {
    var result = [];

    // Get a client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Delete
        client.query("delete from lecture where lid=($1)", [id]);
                        // Select
        var query = client.query("select * from lecture where lid = ($1)", [id], function(err) {
            //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(null, true);
            }
        });

        handleError(err, client, callback);
    });
};

function handleError(err, client, callback) {
    if(err) {
        client.end();
        callback(err);
    }
}

