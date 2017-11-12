angular.module('myApp.event', ["ui.router"])

    .config(['$stateProvider', function($stateProvider) {

        var eventState = {
            url:'/event/:id',
            templateUrl: 'pages/event.html',
            controller: 'evController',
            name: 'event/:id'
        };

        $stateProvider.state(eventState);

    }])

    .controller('evController', function($scope, $http, $routeParams){
        $scope.currentNavItem = 'event';
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