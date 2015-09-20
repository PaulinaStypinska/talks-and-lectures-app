var venue = require('./venue');
var request = require('request');
var util = require('util');
var async = require('async');
var keys = require('./keys.json');


var key = keys.meetup;


// Methods
var categoriesMethod = '2/categories';
var openEventsMethod = '2/open_events';
var openVenuesMethod = '/2/open_venues';

function makeMeetupRequest(method, params) {
  var uri = util.format('http://api.meetup.com/%s?key=%s', method, key);
  uri = uri + params;
  
  request(uri, populateTable) //named the callback in order to make it a recursive function
  }

// Get categories
//makeMeetupRequest(categoriesMethod);

// Get open events
//makeMeetupRequest(openEventsMethod, '&category=6')

makeMeetupRequest(openVenuesMethod, '&country=GB&city=london');

function handleData (err, data){
    if (err) throw err;
    if (data)
    console.log("All done: " + data.id);
    else console.log("Duplicate omitted"); //indicates when a duplicate is in the code, to distinguish from relevant data
}

var obj;
function populateTable (error, response, body) {
    if (!error && response.statusCode == 200) {
        obj = JSON.parse(body);
       var res = obj.results;
       var arr = Array.prototype.slice.call(res); //rule for ignoring duplicates is now build into a table and have to build it into the schema later on too
        console.log(arr.length);
       
        insertVenues(arr);  
        if (obj.meta.next) //does it wait for the callback to finish
        //recursive function here, to make sure all venues are inserted into the database
            request(obj.meta.next, populateTable); 
        else return;
        }
}

function insertVenues(arr){
      /*
       arr.forEach(function(item, index){
          venue.create({"name": item.name, "building": null,"street": item.address_1, "longitude": item.lon, "latitude": item.lat}, handleData);
            console.log(item.name + " is number " + index);
        });
        
      */     
        async.each(arr, function (item, callback){
         venue.create({"name": item.name, "building": null,"street": item.address_1, "longitude": item.lon, "latitude": item.lat}, handleData);
        }, 
        function (err){ 
        if (err) throw err;
       //     console.log("ok", obj.meta);
                   }
       );
}