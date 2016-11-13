var venue = require('../venue');
var lecture = require('../lecture');
var async = require('async');

function insertEvents (events, cb) {
    async.series([
        function (cb) {
            async.each(events, (event, cb) => {
                venue.upsert({"name": event.venue.name, "address1": event.venue.address1, "address2": event.venue.address2, "post_code":  event.venue.post_code, "longitude": event.venue.longitude, "latitude": event.venue.latitude}, function (err, result) {
                            if (err) cb(err);
                            else cb();
                        });
            }, function (err) {
                if (err) cb(err);
                else cb(null, 'venue upsert has finished');
            });
        },
        function (cb) {
            async.each(events, (event, cb) => {
                          lecture.upsert({"title": event.title, "datetime": event.datetime, "url": event.url, "description": event.description,"name": event.venue.name, "category_id": event.category_id}, function (err, result) {
                            if (err) cb(err);
                            else cb();
                        });
            }, function (err) {
                if (err) cb(err);
                else cb(null, 'lecture upsert has finished');
            });
        }], 
        function (err, result) {
            if (err) {
                cb(err);
            } else {
                cb(null, result);
            }
        }
    )
};
    

module.exports = insertEvents;