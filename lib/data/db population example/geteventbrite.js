var lecture = require('../lecture');
var venue = require('../venue');
var request = require('request');
var util = require('util');
var async = require('async');
var keys = require('./keys.json');

var key = '?token=' + keys.eventbrite;

//methods

var eventsMethod = 'events/';

//to add params to get events with venues in GB and london 

function makeEventbriteRequest (method){
    var uri = util.format('https://www.eventbriteapi.com/v3/',method,key);
    request('https://www.eventbriteapi.com/v3/events/search/?expand=category,format,venue&venue.city=london&venue.country=GB&token=QNYJWT5LPRJNYHRO7QQW&formats=2', populateTable);
}

function handleData (err, data){
    if (err) throw err;
    if (data)
    console.log("All done: " + data.id);
    else console.log("Duplicate omitted"); //indicates when a duplicate is in the code, to distinguish from relevant data
}

//this is a recursive function which will populate the table
function populateTable (error, response, body){
        if (!error && response.statusCode == 200) {
            //gets the data and translates it from JSON
            var data = JSON.parse(body);
            // accesses number of pages of data, enabling the set up of a recursive function
            var pages = data.pagination;
            var arr = Array.prototype.slice.call(data.events);
         insertEvents(arr);
         // console.log(arr[1].description.text);
        }
}

function insertEvents (events) {

           async.each(events, function (item, callback){
              lecture.create({"title": item.name.text, "datetime": item.start.utc, "url": item.url, "description": item.description.text, "name": item.venue.name, "category": item.category}, handleData);
       
  }, function (err){
               if (err) throw err;
   });
        }

          


makeEventbriteRequest(eventsMethod);

