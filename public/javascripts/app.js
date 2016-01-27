//will split it into modules once it gets too convoluted
var myApp = angular.module('myApp', ["ngRoute", 'uiGmapgoogle-maps']);

myApp.config(function($routeProvider, uiGmapGoogleMapApiProvider){
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
    .when('/venue/:name', {
        templateUrl:'pages/venue.html',
        controller: 'venueController'
    })
    
    .when('/event/:title', {
        templateUrl:'pages/event.html',
        controller: 'evController'
    });
    
    
    
//need to include the prerender io settings
    
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDL-sp89nd480lg7S7bi1eAglTC9G40lGw',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});



myApp.controller('mainController', function($scope){
    $scope.message = "One to go!";
    console.log("main controller is working");
});



myApp.controller('eventController', function($scope, $http, uiGmapGoogleMapApi){
     $scope.lectures = {};
            $http.get('/event')
        .then(function(response) {
            $scope.lectures = response.data;
        }, function(error) {
            console.log('Error: ' + error);
        });
  

});

myApp.controller('venuesController', function($scope, $http, uiGmapGoogleMapApi){
    $scope.venues = {};

            $http.get('/venue')
        .then(function(response) {
            var info= response.data;
            $scope.venues = info;
            uiGmapGoogleMapApi.then(function(maps) {
                $scope.map = { center: { latitude: 51.5033, longitude: 0.1197 }, zoom: 11 };

    			// add markers for each location on the loaded tour
			    $scope.markers = [];
			    // function to create an individual marker
			    $scope.createMarker = function(location) {
			      var marker = {
			        id: location.id,
			         latitude: location.latitude,
			         longitude: location.longitude,
                     events: {
                     click: function(){
                        var url = '#' + location.name;
                         /*will later jump to the right place on the page*/
                        /* window.open(window.location.href + url);*/
                         var element = document.getElementById(location.id);
                         var places = $('a[name]');
                         $(places).removeClass('highlight');
                         $(element).addClass('highlight');
                     }
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
                console.log(info[0]);
            }); 
        }, function(error) {
            console.log('Error: ' + error);
        });
    
    
});


myApp.controller('venueController', function($scope, $http, $routeParams, uiGmapGoogleMapApi){
    $scope.name = $routeParams.name;
    $scope.venue = {};
    $http.get('/venue')
        .then(function(response){
        var details = response.data;
            $scope.venue = details.filter(function(entry){
                return entry.name  == $scope.name;
            })[0];
        console.log($scope.venue);
         uiGmapGoogleMapApi.then(function(maps) {
                $scope.map = { center: { latitude: 51.5033, longitude: 0.1197 }, zoom: 11 };
                $scope.marker = {
                    id: 0,
                    coords: {
                    latitude: $scope.venue.latitude,
                    longitude: $scope.venue.longitude
                }
                };
            }); 
        }, function(error){
        console.log('Error: ' + error);
    });    
});



myApp.controller('evController', function($scope, $http, $routeParams, uiGmapGoogleMapApi){
    $scope.title = $routeParams.title;
    $scope.lecture = {};
    $http.get('/event')
        .then(function(response){
        var details = response.data;
            $scope.lecture = details.filter(function(entry){
                return entry.title  == $scope.title;
            })[0];
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
});

