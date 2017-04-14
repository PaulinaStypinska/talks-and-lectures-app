'use strict';

angular.module('myApp.venue', ["ui.bootstrap", "ui.router", "uiGmapgoogle-maps", 'ngMaterial'])

    .config(['$stateProvider', function($stateProvider) {


        var venueState = {
            url: '/venue/:id',
            templateUrl:'pages/venue.html',
            controller: 'venueController',
            name: 'venue:id'
        };

        $stateProvider.state(venueState);
    }])

    .controller('venueController', function($scope, $http, $routeParams, uiGmapGoogleMapApi){
        $scope.currentNavItem = 'venue';
        $scope.vid = $routeParams.id;
        $scope.venue = {};
        $http.get('/api/venue')
            .then(function(response){
                //gets data and accesses it
                var details = response.data.slice;
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



    });
