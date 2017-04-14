'use strict';

angular.module('myApp.services.venue-service', [])


    .factory('Venue', function Venue ($http, $q) {

        var service = {
            venues: {},
            getVenues: getVenues
        };

        return service;

        function getVenues () {
            var def = $q.defer();
            $http.get('/api/venue', {'Accept':'application/json'})
                .success(function(response) {
                    service.venues = response;
                    def.resolve(response);
                })
                .error(function() {
                    def.reject("Failed to get venue");
                });
            return def.promise;
        };

    });
