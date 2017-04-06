'use strict';

angular.module('myApp.main', ["ui.bootstrap", "ngRoute", "uiGmapgoogle-maps", 'ngMaterial'])

    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'pages/about.html',
            controller: 'mainController'
        });
    }])

    .controller('mainController', function($scope){
        $scope.message = "This is the talks, lectures & seminars in London webpage. To access the events and venues, please " +
            "click on the tabs above.";
        $scope.message2 = "Here is my github page.";
        $scope.link = "https://github.com/PaulinaStypinska/talks-and-lectures-app";
        $scope.message3 = "Please visit for a full breakdown of my thought process on this and my plan for improvements.";
    });