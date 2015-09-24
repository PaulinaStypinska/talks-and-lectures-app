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
                        requestData(openVenuesMethod, '&country=GB&city=london'),
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
  
  request(uri, updateData) //named the callback for it to become recursive within the update data function
  }


function updateData (error, response, body) { //transforms meetup data and calls the upsert method recursively
    if (!error && response.statusCode == 200) {
        obj = JSON.parse(body);
       var res = obj.results;
       var arr = Array.prototype.slice.call(res); //rule for ignoring duplicates will be built into a table and have to build it into the schema later on too
        upsert(arr, handleData);  
        if (obj.meta.next) //does it wait for the callback to finish (as the upsert is invoked as a normal function)
        //recursive function here or re-insert the code here
            request(obj.meta.next, upsert); 
        else return;
        }
}
//'with upsert as (update venue set name=$1, building=$2, longitude=$4, latitude=$5 where street=$3 returning *) insert into venue(name, building, street, longitude, latitude) select $1,$2,$3,$4,$5 where not exists (select * from upsert) returning id'

function upsert(arr, callback){    //calls async each on the exported upsert function
    async.each(arr, function(item, callback) {
         venue.upsert({"name": item.name, "building": null,"street": item.address_1, "longitude": item.lon, "latitude": item.lat}, function(err, result) { //doesn't work on upsert code
             callback(err, result);
             if (result)
             console.log("All done: " + result.id);
             else console.log("Updated"); //not sure about this one, should it still return id if it's only updated? seems to be working so far
            }),
          function(err){
        if (err) throw err;
        }
    });
}


function handleData (err, result){
    if (err) throw err;
}

requestData(openVenuesMethod, '&country=GB&city=london')