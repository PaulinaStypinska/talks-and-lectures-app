'use strict';

angular.module('myApp.services.event-service', [])



.factory('Event', function Event ($http, $q) {

        var service = {
            events: {},
            getEvents: getEvents
        };

        return service;

    function getEvents () {

        let def = $q.defer();
        //http get function
        $http.get('/api/event', {'Accept':'application/json'})
            .success(function(response) {
                 response = response.filter(function(el, i) {
                    return response[i].datetime >= new Date().toISOString()
                });
                service.events = response;
                def.resolve(response);
            })
            .error(function() {
                def.reject("Failed to get events");
            });
        return def.promise;
    }

});
