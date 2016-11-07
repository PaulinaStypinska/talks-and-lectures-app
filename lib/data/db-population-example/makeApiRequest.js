'use strict';

var request = require('request');
var util = require('util');

const MEETUP = 'api.meetup.com';
const EVENTBRITE = 'api.eventbrite.com';

var meetupArray = [];

function sendRequest (initalUri, method, key, params, cb){
    var uri = util.format(initalUri,method,key);
    uri = uri + params;
    request(uri, cb);
}
//callback to sendRequest
function transformResults (error, response, body) {
    if (!error && response.statusCode == 200) {
        var host = response.req.headers.host;
        var obj = JSON.parse(body);
        var lectures;
        if (host == MEETUP) {
           lectures = obj.results;
        } else if (host == EVENTBRITE) {
           lectures = obj.events;
        }
        var lecturesInArray = Array.prototype.slice.call(lectures);
        var lecturesWithVenues = lecturesInArray.filter(function(el, i){
           if (host === MEETUP) {
                if ('venue' in el)
                   return true;
           } else if (host === EVENTBRITE) {
                if ('venue' in el && el.venue.name !== null)
                   return true; 
           } else throw new Error('Host of the request doesn\'t match.');
        });
        
        return lecturesWithVenues;      
        
    } else {
        
        throw new Error('Populate table has failed.');  
        
    }
}

module.exports = {
    sendRequest: sendRequest,
    transformResults: transformResults
}
