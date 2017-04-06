'use strict';
//var gmapKey = require('../../lib/data/db population example/keys.json').gmap;
angular.module('myApp', ["ui.bootstrap", "ngRoute", "uiGmapgoogle-maps", 'ngMaterial', 'myApp.main',
'myApp.event','myApp.events','myApp.venue','myApp.venues', 'myApp.filters'])

.config(function($routeProvider, $locationProvider){
    $routeProvider.otherwise({redirectTo: "/"});
    //need to include the prerender io settings
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
      $locationProvider.hashPrefix('!');
});





