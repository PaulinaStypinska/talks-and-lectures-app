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
        var events = validateEvents(lectures, host);
        return mapEvents(events, host);
        
    } else {
        
        throw new Error('Populate table has failed.');  
        
    }
}

function validateEvents (events, host) {
    var eventArray = Array.prototype.slice.call(events);
    
    return eventArray.filter((el, i) => {
           if (host === MEETUP) {
                if ('venue' in el)
                   return true;
           } else if (host === EVENTBRITE) {
                if ('venue' in el && el.venue.name !== null)
                   return true; 
           } else throw new Error('Host of the request doesn\'t match.');
        });
}

function mapEvents (events, host){
    return events.map((el, i)=> {
        if (host == MEETUP) {
            var datetime = new Date(el.time).toISOString();
            return {
                title: el.name,
                datetime: datetime,
                url: el.event_url,
                description: el.description,
                category_id: el.group.category.id,
                venue: {
                    name: el.venue.name,
                    address1: el.venue.address_1,
                    address2: el.venue.city,
                    post_code: null,
                    longitude: el.venue.lon,
                    latitude: el.venue.lat
                    }
                };
        } else if (host === EVENTBRITE) {
             return {
                title: el.name.text,
                datetime: el.start.utc,
                url: el.url,
                description: el.description.html,
                category_id: el.category_id,
                venue: {
                    name: el.venue.name,
                    address1: el.venue.address.address_1,
                    address2: el.venue.address.address_2,
                    post_code: el.venue.address.postal_code,
                    longitude: el.venue.address.longitude,
                    latitude: el.venue.address.latitude
                    }
                };
        } else {
            throw new Error('Host is unknown');
            }  
    });
}

module.exports = {
    sendRequest: sendRequest,
    transformResults: transformResults
}
