var venue = require('../venue');
var lecture = require('../lecture');
var request = require('request');
var util = require('util');
var async = require('async');
var apiRequest = require('./apiRequest');

var key = process.env.MEETUP_TOKEN;

// Methods
var categoriesMethod = '2/categories';
var openEventsMethod = '2/open_events';
var openVenuesMethod = '/2/open_venues';

var initialUri = 'http://api.meetup.com/%s?key=%s';

var meetupParam1 = '&country=GB&city=London&fields=category,venue';

// Get open events
apiRequest(initialUri, openEventsMethod, meetupParam1, populateTable);



function handleData (err, data){
    if (err) throw err;
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
      //  console.log(arrWithVenues);
      insertEvents(arrWithVenues);  
        //THIS IS BASED ON MEETUP META DATA
        /*
        if (obj.meta !== null && pagesCount > obj.meta.count) {
        //recursive function here, to make sure all venues are inserted into the database
            meetupParam2 = meetupParam1 + '&page=' + pagesCount.toString();
             //   console.log(obj.meta.count);
              // console.log(meetupParam2);
            makeMeetupRequest(openEventsMethod, meetupParam2);
            }
        }
        else return;
        */
        }
    else console.log(response.statusCode);
}



