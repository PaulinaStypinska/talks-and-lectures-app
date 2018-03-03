var path = require('path');
var config = require('../../config');
var call = require('./makeApiRequest');


function getEvents (origin) {
    var details = config.get(origin);
    var key = origin=='meetup' ? process.env.MEETUP_TOKEN : process.env.EVENTBRITE_TOKEN;
    var params = [details.method, key, details.param];
    return call.sendRequest(details.uri, call.transformResults, params)
 }


getEvents('meetup');
