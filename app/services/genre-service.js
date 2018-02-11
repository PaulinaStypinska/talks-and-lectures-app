'use strict';

angular.module('myApp.services.genre-service', [])

    .factory('Genre', function Genre ($http, $q) {

        let service = {
            genres: {},
            getGenres: getGenres
        };

        return service;

        function getGenres () {

            let def = $q.defer();
            //http get function
            $http.get('/api/genre', {'Accept':'application/json'})
                .success(function(response) {
                    service.genres = response;
                    def.resolve(response);
                })
                .error(function() {
                    def.reject("Failed to get genres");
                });
            return def.promise;
        }

    });
