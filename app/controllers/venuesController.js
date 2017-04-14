'use strict';

angular.module('myApp.venues', ["ui.router", "uiGmapgoogle-maps"])

    .config(['$stateProvider', function($stateProvider) {


        var venuesState = {
            url: '/venue',
            templateUrl: 'pages/venues.html',
            controller: 'venuesController',
            name: 'venue'
        };


        $stateProvider.state(venuesState);
    }])


    .controller('venuesController', function($scope, $http,uiGmapGoogleMapApi){
        $scope.venues = {};
        $scope.currentNavItem = 'venue';

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
        $http.get('/api/venue')
            .then(function(response) {
                var info= response.data.slice(0,50);
                console.log(info);
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