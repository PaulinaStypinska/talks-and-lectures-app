'use strict';

var request = require('request');
var util = require('util');

var config = require('../../config');
var insertEvents = require('./insertData');

const MEETUP = 'api.meetup.com';
const EVENTBRITE = 'www.eventbriteapi.com';

function sendRequest (initialUri, cb, ...optionsArr){
    if (optionsArr[0].length !== 0) {
        var uri = util.format(initialUri, optionsArr[0][0], optionsArr[0][1]);
        uri = uri + optionsArr[0][2];
    } else {
        uri = initialUri;
    }
    request(uri, cb);
}


//callback to sendRequest
function transformResults (error, response, body) {
    if (!error && response.statusCode == 200) {
        var host = response.req._headers.host;
        var obj = JSON.parse(body);
        var nextPage, lectures, options;
        if (host == MEETUP) {
            lectures = obj.results;
            nextPage = obj.meta.next;
            options = [];
        } else if (host == EVENTBRITE) {
            lectures = obj.events;
            var eventbriteNext = getEventbriteNextPage(obj);
            nextPage = eventbriteNext[0];
            options = eventbriteNext[1];
        }
        saveEvents(lectures, host);
        sendRequest(nextPage, transformResults, options);
    } else if (typeof response === 'undefined') {
        return 'finished importing all of the data.'
    } else {
        throw new Error('Populate table has failed.');     
    }
}

function saveEvents (events, host) {
    events = mapEvents(validateEvents(events, host), host);
    insertEvents(events, (err, result) => {
        if (err) throw err;
        else console.log(result);
    });
}

function getEventbriteNextPage (lectures) {
    var totalPages = lectures.pagination.page_count;
    var thisPage = lectures.pagination.page_number;
    if (totalPages > thisPage){
        var eventbriteOptions = config.get('eventbrite');
        var eventbriteUri = eventbriteOptions.uri;
        var nextPage = thisPage + 1;
        var param = eventbriteOptions.param + '&page=' + nextPage;
        return [eventbriteUri, [eventbriteOptions.method, process.env.EVENTBRITE_TOKEN, param]];
    } else {
        throw new Error('Issues with page numbering in eventbrite');
    }
}


function validateEvents (events, host) {
    return events.filter((el, i) => {
           if (host === MEETUP) {
                if ('venue' in el)
                   return true;
           } else if (host === EVENTBRITE) {
                if ('venue' in el && el.venue !== null && el.venue.name !== null && el.venue.address.city == 'London')
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
