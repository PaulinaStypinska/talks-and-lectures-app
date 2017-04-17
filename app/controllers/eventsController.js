'use strict';

angular.module('myApp.events', ["infinite-scroll", "ui.bootstrap", "ui.router", 'ngMaterial'])

    .config(['$stateProvider', function($stateProvider) {

        var eventsState = {
            url: '/event',
            templateUrl: 'pages/events.html',
            controller: 'eventController',
            name: 'event'
        };

        $stateProvider.state(eventsState)
    }])

    .controller('eventController', function($scope, Event, Genre){

        $scope.lectures = [];
        $scope.allLectures = [];
        $scope.events = [];
        $scope.genres = [];

        let lastItem = 20;

        $scope.getEvents = function() {
            Event.getEvents()
                .then(function(events) {
                    $scope.events = events;
                    $scope.allLectures = events.slice(lastItem);
                    $scope.lectures = events.slice(0,lastItem);
                },
                function (events) {
                    console.log("Failed to get events");
                });
        };

        $scope.getGenres = function () {
            Genre.getGenres()
                .then(function(genres) {
                    $scope.genres = genres;
                },
                function(genres){
                    console.log("Failed to get genres");
                });
        };

        $scope.loadMoreLectures = function() {
            let temp = $scope.allLectures.slice(0,lastItem);
            $scope.allLectures = $scope.allLectures.slice(lastItem);
            temp.forEach(function(el) {
               $scope.lectures.push(el);
            });
        };


        $scope.getEvents();
        $scope.getGenres();





        $scope.selGenre = function (genre) {

            $scope.allLectures = $scope.events.filter(function(el,i) {
                return $scope.events[i].genre === genre;
            });
            $scope.lectures = $scope.allLectures.slice(0,20);
            $scope.allLectures = $scope.allLectures.slice(20);

            if(genre.length === 0){
                $scope.getEvents();
            }
        }

    });


        // //function for search
        // $scope.getMatches = function (searchText){
        //     $scope.lectures = $scope.allLectures;
        //     var results = $scope.lectures.filter(function(el,i){
        //         var title = $scope.lectures[i].title;
        //         title = title.toLowerCase();
        //         return title.includes(searchText.toLowerCase());
        //     });
        //     $scope.lectures = results;
        //     return $scope.lectures;
        // };
        //

        //
        // //datetime picker settings
        // $scope.myDate = new Date();
        //
        // $scope.selectDate = function (){
        //     $scope.lectures = $scope.allLectures;
        //
        //     var temp = $scope.lectures.filter(function(el,i){
        //         var chosenDate = $scope.myDate;
        //         var cdString = chosenDate.toISOString();
        //         return $scope.lectures[i].datetime >= cdString;
        //
        //     });
        //     console.log(temp);
        //     $scope.lectures = temp;
        //     return $scope.lectures;
        // };





