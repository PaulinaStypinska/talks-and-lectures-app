var venue = require('../venue');
var lecture = require('../lecture');
var request = require('request');
var util = require('util');
var async = require('async');


//requires dotenv and splits config for clarity
var dotenv = require('dotenv').config({path:'../../../.env'});

//have to configure path since env is in the root folder

var key = process.env.MEETUP_TOKEN;

// Methods
var categoriesMethod = '2/categories';
var openEventsMethod = '2/open_events';
var openVenuesMethod = '/2/open_venues';

function makeMeetupRequest(method, params) {
  var uri = util.format('http://api.meetup.com/%s?key=%s', method, key);
  uri = uri + params;
  
  request(uri, populateTable) //named the callback in order to make it a recursive function
  }



// Get open events
makeMeetupRequest(openEventsMethod, '&country=GB&city=London&fields=category,venue&topic=seminars,lectures,talks')



function handleData (err, data){
    if (err) throw err;
//indicates when a duplicate is in the code, to distinguish from relevant data
}

var obj;
function populateTable (error, response, body) {
    if (!error && response.statusCode == 200) {
        obj = JSON.parse(body);
       var res = obj.results;
       var arr = Array.prototype.slice.call(res); 
        //rule for ignoring duplicates is now build into a table and have to build it into the schema later on too
       var arrWithVenues = arr.filter(function(el,i){
               if ('venue' in arr[i])
                   return true;
           
       });

       insertEvents(arrWithVenues);  
        //THIS IS BASED ON MEETUP META DATA
       // if (obj.meta.next) 
        //recursive function here, to make sure all venues are inserted into the database
        //request(obj.meta.next, populateTable); 
        //else return;
        }
}

function insertEvents(arr){
  async.each(arr, function(item,callback){
        venue.upsert({"name": item.venue.name, "address1": item.venue.address_1, "address2": item.venue.city, "post_code": null, "longitude": item.venue.lon, "latitude": item.venue.lat}, handleData);  
       });
    async.each(arr, function(item,callback){
        //CONVERTS MEETUP TIME ITEM TO ISO STRING 
        var datetime = new Date(item.time);
        datetime.toISOString();
        lecture.upsert({"title": item.name, "datetime": datetime, "url": item.event_url, "description": item.description,"name": item.venue.name, "category_id": item.group.category.id}, handleData);
    });
}

