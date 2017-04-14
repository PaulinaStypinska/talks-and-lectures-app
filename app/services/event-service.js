'use strict';

angular.module('myApp.services.event-service', [])



.factory('Event', function Event ($http, $q) {

        var service = {
            events: {},
            getEvents: getEvents
        };

        return service;

    function getEvents () {

        var def = $q.defer();
        //http get function
        $http.get('/api/event', {'Accept':'application/json'})
            .success(function(response) {
                var collection = response;
                // var today = new Date();
                service.events = collection;
                def.resolve(response);
                // collection.forEach(function(el, i){
                //
                //     // $scope.lectures = $scope.lectures.filter(function(el,i){
                //     //     var element = $scope.lectures;
                //     //     var today = new Date();
                //     //     return element[i].datetime >= new Date().toISOString();
                //     // });
                //
                //     // $scope.allLectures = $scope.lectures;
                // });
            })
            .error(function() {
                def.reject("Failed to get events");
            });
        return def.promise;
    };

});
