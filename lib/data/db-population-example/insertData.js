var venue = require('../venue');
var lecture = require('../lecture');
var async = require('async');



function insertEvents (events, cb) {
    async.series([
        function (cb) {
            events.forEach((event,i) => {
                venue.upsert({"name": event.venue.name, "address1": event.venue.address1, "address2": event.venue.address2, "post_code":    event.post_code, "longitude": event.venue.longitude, "latitude": event.venue.latitude}, (err, result) => {
                    if (err) throw new Error('venue upsert failed');
                });
            });
            cb(null, 'venue upsert finished');
        },
        function (cb) {
            events.forEach((event,i) => {
                lecture.upsert({"title": event.title, "datetime": event.datetime, "url": event.url, "description": event.description,"name": event.venue.name, "category_id": event.category_id}, (err, result) => {
                   if (err) throw new Error('lecture upsert has failed');
                });
            });
            cb(null, 'lecture upsert finished');
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