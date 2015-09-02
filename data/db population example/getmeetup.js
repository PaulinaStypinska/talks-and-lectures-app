var fixtures = require('./fixture');
var lecture = require('./lecture');
var venue = require('./venue');
var request = require('request');
var util = require('util');
var async = require('async');


var key = 'tbc';


// Methods
var categoriesMethod = '2/categories';
var openEventsMethod = '2/open_events';
var openVenuesMethod = '/2/open_venues';

function makeMeetupRequest(method, params) {
  var uri = util.format('http://api.meetup.com/%s?key=%s', method, key);
  uri = uri + params;
  
  request(uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
       var obj = JSON.parse(body);
       var res = obj.results;
       var arr = Array.prototype.slice.call(res);
        arr.forEach(function(item){
            venue.create({"name": item.name, "building": null,"street": item.address_1, "longitude": item.lon, "latitude": item.lat}, handleData);
            console.log("longitude: "+ item.lon + ", latitude: " + item.lat);
        }); //ideally this function would return the object and the functions populating the database would call this function within them, to improve its reuse.
        }
})
          }

// Get categories
//makeMeetupRequest(categoriesMethod);

// Get open events
//makeMeetupRequest(openEventsMethod, '&category=6')

makeMeetupRequest(openVenuesMethod, '&country=GB&city=london');

function handleData (err, result){
    if (err) throw err;
    console.log(result); //just for now, to make sure the data feeds and is transformed correctly.
}