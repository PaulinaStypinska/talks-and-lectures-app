process.env.NODE_ENV = 'production'; //sets this up as production

var cronJob = require('cron').CronJob;
var venue = require('./venue');
var request = require('request');
var util = require('util');
var async = require('async');
var keys = require('./keys.json');

//config date
var config = require('../../config/config.json');
var time = config.get('cron.schedule'); //fetches the schedule fron config json


var key = keys.meetup;


var job = new cronJob(time,  //runs it everyday at 6 am
                     //function upserting the venues
                        makeMeetupRequest(openVenuesMethod, '&country=GB&city=london'),
                       //function exectuted when the prev function stops, trivial
                      signal(),
                      false 
                     ); //could specify  the time zone if necessary
job.start();

var openVenuesMethod = '/2/open_venues';

function signal(){
console.log('all upserts are now done');
}

function requestData(method, params) { //renamed this function to avoid accidentally copying it. the upsert fn inside differs from the insert one in the getmeetup file
  var uri = util.format('http://api.meetup.com/%s?key=%s', method, key);
  uri = uri + params;
  
  request(uri, updateData) //named the callback for it to become recursive
  }


function updateData (error, response, body) {
    if (!error && response.statusCode == 200) {
        obj = JSON.parse(body);
       var res = obj.results;
       var arr = Array.prototype.slice.call(res); //rule for ignoring duplicates will be built into a table and have to build it into the schema later on too
        console.log(arr.length);     
        upsert(arr);  
        if (obj.meta.next) //does it wait for the callback to finish (as the upsert is invoked as a normal function)
        //recursive function here or re-insert the code here
            request(obj.meta.next, upsert); 
        else return;
        }
}

function upsert(arr){    
    async.each(arr, function(venue, callback) {
        client.query('with upsert as (update venue set name=$1, building=$2, longitude=$4, latitude=$5 where street=$3 returning *) insert into venue(name, building, street, longitude, latitude) values($1,$2,$3,$4,$5) where not exists (select * from upsert)', [venue.name, null, venue.street, venue.longitude, venue.latitude], handleData); //the upsert query: updates the venue and if it does not exist, it inserts it
    }, function (err) {
        if(err) throw err;
    }
);
}


function handleData (err, data){
    if (err) throw err;
    console.log("All done: " + data.id);
}