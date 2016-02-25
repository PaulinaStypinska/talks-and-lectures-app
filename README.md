[![Build Status](https://travis-ci.org/PaulinaStypinska/talks-and-lectures-app.svg)](https://travis-ci.org/PaulinaStypinska/talks-and-lectures-app)

A full-stack website for all seminars, talks & lectures in London. [It is now hosted on Heroku. Click here to take a look.] (https://secure-fortress-51530.herokuapp.com/)

Please scroll down for the code breakdown. You can also run it locally by following the instructions below.

#### Few related notes and disclaimers:

* This is an ongoing project that I want to be hosted for free at this point. This is why:
    * there is limited amount of data hosted (there is a limit of rows in the free heroku postgres plan), and
    * loading the website for the first time might be slow (the app sleeps after 30 mins of inactivity).
* My own CSS file is tiny so I didn't feel the need to use Sass or Less. My objective was to create a clean-looking website, so that the data displayed would be legible and accessible. I am no designer!
* **I have a lot of ideas for improvements and would be happy to chat. All comments and feedback are welcome.**

Requirements:

- [PostgreSQL] (http://www.postgresql.org/download/)
- [Node] (https://nodejs.org/en/)
- [Express] (http://expressjs.com/)
- [Angular] (https://angularjs.org/), among others.

# How to run this locally

#### Make sure you have postgreSQL installed on your system.
You can follow the steps below for a Mac installation or go to the [PostgreSQL site] (http://www.postgresql.org/download/) to configure and set it up.

You will need postgreSQL version 9.5.

######Postgresql on Mac OSX

Install Postgresql

    brew install postgresql
    initdb /usr/local/var/postgres

Start Postgresql

    pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
    
Stop Postgresql

    pg_ctl -D /usr/local/var/postgres stop

######Setup

Create database

    psql postgres < createDatabase.sql 
 
#### Run npm install in your command window to install your dependencies

#### Configure a dotenv file.
For full information, see [the dotenv npm site] (https://www.npmjs.com/package/dotenv) file. The only process.env variable you will need for this is process.env.DATABASE_URL which is essential for your tests. Locally this should be configured to your user and password.
You may not need to configure your API keys for this.

#### Run npm test in your command window.
This will populate your database with test data and ensure all queries are passing the tests.

#### Run npm start. 
And open your browser at localhost:8080. Test data should be displayed.


# A few words on the setup, ie a my application organisation structure

#### Database

I am using an object-relational database system (PostgreSQL). I have used mongoDB in the past, but have decided to go with postgreSQL for this project. I have wanted to use an ORDBMS, and PostgreSQL offers very good data validity checks and ability to store JSON data, should I want to implement that.

Here is an example of table setup (using node-postgres):
* ids are customised because I use joins on almost every select function in my code and use the ids frequently,
* unique constraints ensure same data from different sources won't be duplicated
* sequence rules ensure ids get reset for every test
```
var createLectureTable = 'create table lecture \ \
                       ( \
                        lid int primary key not null, \
                        title text not null, \
                        venue_id int references venue(vid) on delete set null, \
                        tag_id int references tag(tid) on delete set null not null, \
                        datetime timestamp, \
                        url text, \
                        description text, \
                        UNIQUE (url, datetime)\
                      );\
                      drop sequence if exists lecture_lid_seq;\
                      create sequence lecture_lid_seq;\
                      alter table lecture alter column lid set default nextval(\'lecture_lid_seq\')';
```

#### Node

I use [node-postgres] (https://github.com/brianc/node-postgres) as a client for postgreSQL. 

I have created a CRUD layer  for all of my tables. (It is in [a lib/data folder] (https://github.com/PaulinaStypinska/talks-and-lectures-app/tree/master/lib/data)).

Here is an example of a lecture upsert query, which:
* as of postgres v. 9.5, checks for an existence of a row (based on url and datetime unique rule) and if it doesn't exist, updates selected row
* references venue table id (vid) based on the venue name
* reference tag table id (tid) based on the tag/genre id. If missing, uses COALESCE() function to insert a 'Misc' tag id.
* returns lecture table id (lid) in a callback function for test purposes
* calls done(), which returns a client instance to the pool and allows to run the query in batch updates.
```
//upserts data
exports.upsert = function(data, callback) {
    pg.connect(connectionString, function(err, client, done) {
        client.query("insert into lecture(title, venue_id, tag_id, datetime, url, description) select $1, (select vid from venue where venue.name=$5), COALESCE((select tid from tag where $6=ANY(tag.eventbrite_id) OR $6=ANY(tag.meetup_id)),(select tid from tag where genre='Misc')), cast($2 as timestamp),$3, $4 ON CONFLICT (url, datetime) DO UPDATE SET (title,description, venue_id, tag_id)=($1,$4,(select vid from venue where venue.name=$5),COALESCE((select tid from tag where $6=ANY(tag.eventbrite_id) OR $6=ANY(tag.meetup_id)),(select tid from tag where genre='Misc'))) returning lid", [data.title, data.datetime, data.url, data.description, data.name, data.category_id], function(err, result) {
           //client.end();
            done();
            if(err) {
                callback(err);
            } else {
                callback(null, result.rows[0]);
            }
        });
    });
}
```
###### My testing framework of choice is [mocha] (https://github.com/mochajs/mocha). 
All the tests are [here] (https://github.com/PaulinaStypinska/talks-and-lectures-app/tree/master/test) and below is an example. Using async, I:
* first create my schema and the tables
* then create [my test fixture] (https://github.com/PaulinaStypinska/talks-and-lectures-app/blob/master/lib/data/fixture.js).

``` 

describe('crud test', function() {

    // Run once before all tests
    before(function(done) {
        this.timeout(0);
        async.series([
            function(callback) {
                fixtures.dropAll(databaseName, function(err, result) {
                    callback(err, result);
                })
            },
            function(callback) {
                fixtures.createAll(databaseName, function(err, result) {
                    callback(err, result);
                })
            },
            function(callback) {
                fixtures.createFixtures(databaseName, function(err, result) {
                    callback(err, result);
                })
            }],
            function(err, results) {
                if(err) {
                    console.log(err);
                }
                done();
            });
    });
    
```

And here is an example of a test:

```
    it('should create venues', function(done) {
        venue.create({"name":"Piccadilly", "address1": "lecture hall 05", "address2": "Lower Marsh", "post_code":"SE8 IR9","longitude": "0.0109", "latitude": "52.1212"}, function(err, result) {
            assert.equal(true, result.vid > 0);
            done();
        });
    });
```   

#### Express

I'm using Express as the my Node.js framework. 

My main [server.js] (https://github.com/PaulinaStypinska/talks-and-lectures-app/blob/master/server.js) file does the following:
* instantiates the express app,
* loads my dotenv file, with all of my process.env variables
* sets up my Prerender.io settings
* sets up multiple static assets directories
* refers to my index.js file for all routes.

My [index.js] (https://github.com/PaulinaStypinska/talks-and-lectures-app/blob/master/routes/index.js) file sets up my routes.
* refers my index file to my default route, AND
* refers my index file to all routes (as in the code below) to ensure the index.html file gets called in all ng-view instances.
 
```
router.all('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

```

* uses GET method and my CRUD layer to return my data as JSON. Requests are directed at altered URI (ie 'api/event' rather than 'event') so the app can differentiate between the Angular route and the Express one (serves pure JSON otherwise). 

```
router.get('/api/event', function(req, res) {
        lecture.retrieve(function(err, results){
            if (err){
              console.log(err);
              return res.status(500).json({ success: false, data: err});
            }
          return res.json(results);
        })
        
});
```
#### Front end - Angular

I am using Angular (v.1.5), an MVC framework, to display my data, through ng-view and multiple partials.

Here is the directory & file structure for my VIEWS folder:
```
.
├── index.html
├── pages
|   ├── about.html
|   └── venue.html
|   |__ venues.html
|   |__ events.html
|   |__ event.html

```
and my app.js file is located in:
```
|__ public 
|   |__ javascripts 
|       |__ app.js
```

The HTML partials are configured using ngRoute module:

```
myApp.config(function($routeProvider, $locationProvider){
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/about.html',
        controller: 'mainController'
    })
    
    .when('/venue', {
        templateUrl: 'pages/venues.html',
        controller: 'venuesController'
    })
    .when('/event', {
        templateUrl: 'pages/events.html',
        controller: 'eventController'
    })
    .when('/venue/:id', {
        templateUrl:'pages/venue.html',
        controller: 'venueController'
    })
    
    .when('/event/:id', {
        templateUrl:'pages/event.html',
        controller: 'evController'
    });
    
    //some more config code
    });
```

##### Each view has a separate controller, with its separate $scope and functions.

EventController and VenueController:
* call http.get on the route configured in index.js file (e.g. 'api/event') and get JSON data from my database as a response,
* contains functions necessary for my ngMaterial UI components,
* in the case of venueController, initalises uiGoogleMapApi.

Individual events and venues' controllers:
* associates $route.param with the item's id,
* uses http.get to request a specific table and filters it by route param,
* in the case of venues, initialises uiGoogleMapApi.

##### My ngMaterial components:
* SELECT: filters events by genre, and venues by name. Displays only selected.
            On each choice, the venues and events scopes get reset so the original object is filtered.

**NOTE**: at this point, it has some UX limitations - it does not reset to a placeholder when another ngMaterial component is being used. It's one of the things I plan to be working on in the upcoming days.

```
    \\ passes 'chosen' genre from the UI component to the function as an argument, for example 'Sci fi'
    $scope.selGenre = function (chosen) {
       \\ makes sure the lectures object (all of my lecture table) gets reset. My HTTP.get method defines $scope.allLectures variable. 
        $scope.lectures = $scope.allLectures;
        \\ tempGen is a temporary object, holding filtered lectures
       var tempGen = $scope.lectures.filter(function(el,i){
           \\ $scope.lectures[i].genre is abstracted away in a variable for legiblity
           var lectGenre = $scope.lectures[i].genre;
           \\ returns all lectures with the chosen genre
           return lectGenre == chosen;
        });
        \\ returns a new filtered $scope.lectures
        $scope.lectures = tempGen;
        return $scope.lectures, $scope.myDate;
    }

```

* DATEPICKER: selects events based on the selected date (onwards).

```
    //datetime picker settings
    \\ automatic date is today
    $scope.myDate = new Date();

    $scope.selectDate = function (){
    \\resets the scope so all events are being filtered
            $scope.lectures = $scope.allLectures;
        
        var temp = $scope.lectures.filter(function(el,i){
        \\ makes sure the date format is identical to the one passed on from my table, which is in DATETIME format.
        \\ $scope.myDate is the date picked in the datepicker
            var chosenDate = $scope.myDate;
            var cdString = chosenDate.toISOString(); 
        \\ returns a new $scope.lectures, where the chosen date is either the same or 'bigger'
            return $scope.lectures[i].datetime >= cdString;

        });
        console.log(temp);
        $scope.lectures = temp;
        \\ returns the new filtered $scope.lectures
        return $scope.lectures;
    };


```

* AUTOCOMPLETE: serves as a search functionality, filtering all events 

```
    //function for search
    // passes the searchText, ie the text typed in the autocomplete, as an argument
    $scope.getMatches = function (searchText){   
        $scope.lectures = $scope.allLectures;
        var results = $scope.lectures.filter(function(el,i){
        \\makes sure each title is compared in the same case
            var title = $scope.lectures[i].title;
            title = title.toLowerCase();
            \\ returns only lectures where title includes the typed text
         return title.includes(searchText.toLowerCase());
        });
        $scope.lectures = results;
        return $scope.lectures;
    };

```
**NOTE**: at this point, automplete has been converted to a search bar. Works well for partial matches but it requires a click outside of the search bar (rather than clicking on a match or just clicking enter) for the autocomplete to disappear. It's one of the issues I plan on fixing. Selecting a title also does not work properly unless a letter has been deleted and added - also to be fixed imminently.

##### Prerender 

I am using prerender.io, a middleware designed to render Javascript in browsers, making it crawlable to search engines.

To do this, I have:
* set up the HTML5 mode in my app.js file:

```
    //need to include the prerender io settings
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
      $locationProvider.hashPrefix('!');
```
* set up my prerender token in my server.js file:

```
var token = process.env.PRERENDER_TOKEN;

//for prerender set up

app.use(require('prerender-node').set('prerenderToken', token));
```
* rewritten my index.js so that it serves the index.html files to all ('/*') routes.


