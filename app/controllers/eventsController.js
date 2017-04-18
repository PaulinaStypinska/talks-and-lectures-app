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
        $scope.selectedDate = new Date();
        $scope.selectedGenre = "";


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
            console.log($scope.selectedGenre);

            $scope.allLectures = $scope.events.filter(function(el,i) {
                return $scope.events[i].genre === genre && $scope.events[i].datetime >= $scope.selectedDate.toISOString();
            });
            $scope.lectures = $scope.allLectures.slice(0,20);
            $scope.allLectures = $scope.allLectures.slice(20);

            if(genre.length === 0){
                $scope.getEvents();
            }
        };



        //datetime picker settings

        $scope.selectDate = function (){

            $scope.allLectures = $scope.events.filter(function(el,i){
                return $scope.events[i].datetime >= $scope.selectedDate.toISOString() && $scope.events[i].genre === $scope.selectedGenre;
            });

            $scope.lectures = $scope.allLectures.slice(0,20);
            $scope.allLectures = $scope.allLectures.slice(20);

        };

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







