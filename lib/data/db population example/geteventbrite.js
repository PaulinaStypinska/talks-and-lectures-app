
var lecture = require('../lecture');
var venue = require('../venue');
var request = require('request');
var util = require('util');
var async = require('async');

//requires dotenv and splits config for clarity
var dotenv = require('dotenv').config({path:'../../../.env'});
//have to configure path since env is in the root folder

var eventbriteKey = process.env.EVENTBRITE_TOKEN;

//methods
var eventbriteEventsMethod = 'events/search/';
var startDate = new Date();
//var eventbriteParam1 = '&expand=category,format,venue&venue.city=london&venue.country=GB&formats=1,2,9,10,19&start_date.range_start=' + encodeURIComponent(startDate.toISOString());

var eventbriteParam1 = '&expand=category,format,venue&venue.city=london&venue.country=GB&formats=1,2,9,10,19';


var eventbriteIntial = 'https://www.eventbriteapi.com/v3/%s?token=%s' 
//to add params to get events with venues in GB and london 

//MAKE EVENTBRITE REQUEST FUNCTION - arguments are abstracted
//ideally there would be one JS file for importing all data from various websites

function makeEventbriteRequest (initalUri, method, key, params){
    var uri = util.format(initalUri,method,key);
    uri = uri + params;
    console.log(uri);
    request(uri, populateTable);
}

function handleData (err){
    if (err) throw err;
}

//this is a recursive function which will populate the table
function populateTable (error, response, body){
        if (!error && response.statusCode == 200) {
            //gets the data and translates it from JSON
            
            var data = JSON.parse(body);
            var arr = Array.prototype.slice.call(data.events);
            //calls the function with the JSON object made into an array
            var arrWithVenues = arr.filter(function(el,i){
               if ('venue' in arr[i] && arr[i].venue.name !== null)
                   return true;          
       });
            var venues = [];
            arrWithVenues.forEach(function(el,i){
                var ven = arrWithVenues[i].venue;
                venues.push(ven.name);
            });
            console.log(venues);
        insertEvents(arrWithVenues);
            // will number of pages of data, enabling the set up of a recursive function
    
            if (data.pagination.page_count > data.pagination.page_number){
                var pageNumber = data.pagination.page_number + 1;
                eventbriteParam2 = eventbriteParam1 + '&page=' + pageNumber.toString();
                //console.log(eventbriteParam2);
                makeEventbriteRequest(eventbriteIntial,eventbriteEventsMethod,eventbriteKey, eventbriteParam2);
            }
        
            //will proceed as the website develops
        }
}

function insertEvents (arr) {
    //first populates the venue table
    //setting this up from the events method means that no venues without events are displayed
    async.each(arr, function(item,callback){
        venue.upsert({"name": item.venue.name, "address1": item.venue.address.address_1, "address2": item.venue.address.address_2, "post_code": item.venue.address.postal_code, "longitude": item.venue.address.longitude, "latitude": item.venue.address.latitude}, handleData);  
    });
    //then populates the lecture table
    async.each(arr, function(item,callback){
        lecture.upsert({"title": item.name.text, "datetime": item.start.utc, "url": item.url, "description": item.description.html,"name": item.venue.name, "category_id": item.category_id}, handleData);
    });
   
  }


makeEventbriteRequest(eventbriteIntial,eventbriteEventsMethod,eventbriteKey, eventbriteParam1);
