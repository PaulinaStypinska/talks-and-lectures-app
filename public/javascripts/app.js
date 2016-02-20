//will split it into modules once it gets too convoluted

//var gmapKey = require('../../lib/data/db population example/keys.json').gmap;
var myApp = angular.module('myApp', ["ui.bootstrap", "ngRoute", "uiGmapgoogle-maps", 'ngMaterial']);

myApp.config(function($routeProvider, $locationProvider){
    $routeProvider
    
    //for about
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
    


    //need to include the prerender io settings
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
      $locationProvider.hashPrefix('!');
    
});



myApp.controller('mainController', function($scope){
    $scope.message = "This is the talks, lectures & seminars in London webpage. To access the events and venues, please click on the tabs above." 
    $scope.message2 = "Here is my github page.";
    $scope.link = "https://github.com/PaulinaStypinska/talks-and-lectures-app";
    $scope.message3 = "Please visit for a full breakdown of my thought process on this and my plan for improvements.";
});

myApp.filter('trustThis', ['$sce', function ($sce){
    return function (pieceOfHTML){
        return $sce.trustAsHtml(pieceOfHTML);
    }
}]);

myApp.controller('eventController', function($scope, $http, uiGmapGoogleMapApi){
     $scope.lectures = {};
    $scope.genres = [];

    
    
    
    //function for search
    $scope.getMatches = function (searchText){   
        $scope.lectures = $scope.allLectures;
        var results = $scope.lectures.filter(function(el,i){
            var title = $scope.lectures[i].title;
            title = title.toLowerCase();
         return title.includes(searchText.toLowerCase());
        });
        $scope.lectures = results;
        return $scope.lectures;
    };
    
    $scope.selGenre = function (chosen) {
        
        $scope.lectures = $scope.allLectures;
       var tempGen = $scope.lectures.filter(function(el,i){
           
           var lectGenre = $scope.lectures[i].genre;
           return lectGenre == chosen;
        });
        $scope.lectures = tempGen;
        return $scope.lectures, $scope.myDate;
    }
    
    //datetime picker settings
    $scope.myDate = new Date();

    $scope.selectDate = function (){
            $scope.lectures = $scope.allLectures;
        
        var temp = $scope.lectures.filter(function(el,i){
            var chosenDate = $scope.myDate;
            var cdString = chosenDate.toISOString(); 
            return $scope.lectures[i].datetime >= cdString;

        });
        console.log(temp);
        $scope.lectures = temp;
        return $scope.lectures;
    };

    
    //http get function
            $http.get('/event')
        .then(function(response) {
                var collection = response.data;
            $scope.lectures = collection;  
            collection.forEach(function(el, i){
                    if ($scope.genres.indexOf(el.genre)== -1){
                        $scope.genres.push(el.genre);
                    }
             $scope.allLectures = $scope.lectures;
                });
        }, function(error) {
            console.log('Error: ' + error);
        });
    
    
});


myApp.filter("removeDups", function(){
  return function(data) {
    if(angular.isArray(data)) {
      var result = [];
      var key = {};
      for(var i=0; i<data.length; i++) {
        var val = data[i];
        if(angular.isUndefined(key[val])) {
          key[val] = val;
          result.push(val);
        }
      }
      if(result.length > 0) {
        return result;
      }
    }
    return data;
  }
});

myApp.controller('venuesController', function($scope, $http, uiGmapGoogleMapApi){
    $scope.venues = {};
    
    //all ng material code
    
    //select
    
        $scope.selVenue = function (chosen) {
            $scope.venues = $scope.allVenues;
           var tempVenue = $scope.venues.filter(function(el,i){

               var venueName = $scope.venues[i].name;
               return venueName == chosen;
            });
            $scope.venues = tempVenue;
            return $scope.venues;
    };
    
    
    
//http get
            $http.get('/venue')
        .then(function(response) {
            var info= response.data;
            $scope.venues = info;
            $scope.allVenues = $scope.venues;
            uiGmapGoogleMapApi.then(function(maps) {
              //filling in for the new lodash version bug  
                  if( typeof _.contains === 'undefined' ) {
                    _.contains = _.includes;
                  }
                  if( typeof _.object === 'undefined' ) {
                    _.object = _.zipObject;
                  }
                
                $scope.map = { center: { latitude: 51.5033, longitude: 0.1197 }, zoom: 11 };

    			// add markers for each location on the loaded tour
			    $scope.markers = [];
			    // function to create an individual marker
			    $scope.createMarker = function(location) {
			      var marker = {
			         id: location.vid,
			         latitude: location.latitude,
			         longitude: location.longitude,
                     options: {
                        title: location.name
                     }
			      };
			      return marker;
			    };
			    // function to fill array of markers
			    $scope.createMarkers = function() {
			      for (var i = 0; i < info.length; i++) {
			        var marker = $scope.createMarker($scope.venues[i]);
			        $scope.markers.push(marker);
			      }
			    };
			    // call upon controller initialization
			    $scope.createMarkers();
            }); 
        }, function(error) {
            console.log('Error: ' + error);
        });
        //seo settings
    
    $scope.seo = {
        pageTitle: 'All venues near you',
        pageDescription:'Find out what happens in your favorite venue'
    }
    
    
});


myApp.controller('venueController', function($scope, $http, $routeParams, uiGmapGoogleMapApi){
    $scope.vid = $routeParams.id;
    $scope.venue = {};
    $http.get('/venue')
        .then(function(response){
        //gets data and accesses it
        var details = response.data;
            $scope.venue = details.filter(function(entry){
                return entry.vid  == $scope.vid;
            })[0];
        //google maps 
         uiGmapGoogleMapApi.then(function(maps) {
                   if( typeof _.contains === 'undefined' ) {
                    _.contains = _.includes;
                  }
                  if( typeof _.object === 'undefined' ) {
                    _.object = _.zipObject;
                  }
                $scope.map = { center: { latitude: $scope.venue.latitude, longitude: $scope.venue.longitude}, zoom: 13 };
                $scope.marker = {
                    id: $scope.venue.vid,
                    coords: {
                    latitude: $scope.venue.latitude,
                    longitude: $scope.venue.longitude
                }
                };
            }); 
        }, function(error){
        console.log('Error: ' + error);
    });   
            //seo settings
    
    $scope.seo = {
        pageTitle: $scope.venue.name,
        pageDescription:'Find oout what happens in your favorite venue'
    }
    
    
});



myApp.controller('evController', function($scope, $http, $routeParams, uiGmapGoogleMapApi){
    $scope.lid = $routeParams.id;
    $scope.lecture = {};
    $http.get('/event')
        .then(function(response){
        var details = response.data;
            $scope.lecture = details.filter(function(entry){
                return entry.lid  == $scope.lid;
            })[0];
        console.log($scope.lecture);
        // a map will display the place of the talk
    uiGmapGoogleMapApi.then(function(maps) {
                $scope.map = { center: { latitude: 51.5033, longitude: 0.1197 }, zoom: 11 };
                $scope.marker = {
                    id: 0,
                    coords: {
                    latitude: $scope.lecture.latitude,
                    longitude: $scope.lecture.longitude
                }
                };
            }); 
    }, function(error){
        console.log('Error: ' + error);
    });    
    
                //seo settings
    
    $scope.seo = {
        pageTitle: $scope.lecture.title,
        pageDescription: 'Your new event'
    }
    
    
});

