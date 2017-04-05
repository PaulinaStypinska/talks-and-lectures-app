'use strict';

angular.module('myApp.events', ["ui.bootstrap", "ngRoute", "uiGmapgoogle-maps", 'ngMaterial'])

    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/event', {
            templateUrl: 'pages/events.html',
            controller: 'controllers/eventController'
        });
    }])

    .controller('eventController', function($scope, $http, uiGmapGoogleMapApi){
        $scope.lectures = {};
        $scope.genres = [];



        //function for search
        $scope.getMatches = function (searchText){
            $scope.lectures = $scope.allLectures;
            var results = $scope.lectures.filter(function(el,i){
                var title = $scope.lectures[i].title;
                title = title.toLowerCase();
                return title.includes(searchText.toLowerCase());
            });
            $scope.lectures = results;
            return $scope.lectures;
        };

        $scope.selGenre = function (chosen) {

            $scope.lectures = $scope.allLectures;
            var tempGen = $scope.lectures.filter(function(el,i){

                var lectGenre = $scope.lectures[i].genre;
                return lectGenre == chosen;
            });
            $scope.lectures = tempGen;
            return $scope.lectures, $scope.myDate;
        }

        //datetime picker settings
        $scope.myDate = new Date();

        $scope.selectDate = function (){
            $scope.lectures = $scope.allLectures;

            var temp = $scope.lectures.filter(function(el,i){
                var chosenDate = $scope.myDate;
                var cdString = chosenDate.toISOString();
                return $scope.lectures[i].datetime >= cdString;

            });
            console.log(temp);
            $scope.lectures = temp;
            return $scope.lectures;
        };


        //http get function
        $http.get('/api/event', {'Accept':'application/json'})
            .then(function(response) {
                var collection = response.data;
                var today = new Date();
                console.log(collection);
                $scope.lectures = collection;
                collection.forEach(function(el, i){
                    if ($scope.genres.indexOf(el.genre)== -1){
                        $scope.genres.push(el.genre);
                    }

                    $scope.lectures = $scope.lectures.filter(function(el,i){
                        var element = $scope.lectures;
                        var today = new Date();
                        return element[i].datetime >= today.toISOString();
                    });

                    $scope.allLectures = $scope.lectures;
                });
            }, function(error) {
                console.log('Error: ' + error);
            });


    });