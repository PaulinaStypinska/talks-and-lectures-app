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


    .controller('venuesController', function($scope, $http, Venue, uiGmapGoogleMapApi){
        $scope.venues = [];
        $scope.venuesForInfiniteScroll = [];
        $scope.currentNavItem = 'venue';

        let lastItem = 15;
        
        $scope.getVenues = function(){
            Venue.getVenues()
                .then(function(venues) {
                        $scope.venuesForMarkers = venues;
                        $scope.venuesForInfiniteScroll = venues.slice(lastItem);
                        $scope.venues = venues.slice(0, lastItem);
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
                                let marker = {
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
                                for (var i = 0; i < $scope.venuesForMarkers.length; i++) {
                                    var marker = $scope.createMarker($scope.venuesForMarkers[i]);
                                    $scope.markers.push(marker);
                                }
                            };
                            // call upon controller initialization
                            $scope.createMarkers();
                        });
                    },
                    function (venues) {
                        console.log("Failed to get venues");
                    });
        };

        $scope.getVenues();


        $scope.loadMoreVenues = function() {
            let temp = $scope.venuesForInfiniteScroll.slice(0,lastItem);
            $scope.venuesForInfiniteScroll = $scope.venuesForInfiniteScroll.slice(lastItem);
            temp.forEach(function(el) {
                $scope.venues.push(el);
            });
        };

        //seo settings

        $scope.seo = {
            pageTitle: 'All venues near you',
            pageDescription:'Find out what happens in your favorite venue'
        }


    });