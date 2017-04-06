'use strict';

angular.module('myApp.event', ["ngRoute"])

    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/event/:id', {
            templateUrl:'pages/event.html',
            controller: 'evController'
        });
    }])

    .controller('evController', function($scope, $http, $routeParams){
        $scope.lid = $routeParams.id;
        $scope.lecture = {};
        $http.get('/api/event')
            .then(function(response){
                var details = response.data;
                $scope.lecture = details.filter(function(entry){
                    return entry.lid  == $scope.lid;
                })[0];

            }, function(error){
                console.log('Error: ' + error);
            });

    });