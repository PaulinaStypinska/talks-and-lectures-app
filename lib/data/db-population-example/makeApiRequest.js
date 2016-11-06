'use strict';

var request = require('request');
var util = require('util');

const MEETUP = 'api.meetup.com';
const EVENTBRITE = 'api.eventbrite.com';

function sendRequest (initalUri, method, key, params, cb){
    var uri = util.format(initalUri,method,key);
    uri = uri + params;
    request(uri, cb);
}

function populateTable (error, response, body) {
    if (!error && response.statusCode == 200) {
        var host = res.req.headers.host;
        var obj = JSON.parse(body);
        var lectures = obj.results;
        var lecturesInArray = Array.prototype.slice.call(meetups); 
        var lecturesWithVenues = lecturesInArray.filter(function(i){
           if (host === MEETUP) {
               if ('venue' in arr[i])
                   return true;
           } else if (host === EVENTBRITE) {
                if ('venue' in arr[i] && arr[i].venue.name !== null)
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
    populateTableL: populateTable
}
