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

    .controller('eventController', function($scope, Event){

        $scope.lectures = [];
        $scope.allLectures = [];

        let lastItem = 15;

        $scope.getEvents = function() {
            Event.getEvents()
                .then(function(events) {
                    $scope.allLectures = events.slice(lastItem);
                    $scope.lectures = events.slice(0,lastItem);
                },
                function (events) {
                    console.log("Failed to get events");
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
        // $scope.selGenre = function (chosen) {
        //
        //     $scope.lectures = $scope.allLectures;
        //     var tempGen = $scope.lectures.filter(function(el,i){
        //
        //         var lectGenre = $scope.lectures[i].genre;
        //         return lectGenre == chosen;
        //     });
        //     $scope.lectures = tempGen;
        //     return $scope.lectures, $scope.myDate;
        // }
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





