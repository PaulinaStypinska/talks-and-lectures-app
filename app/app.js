
//var gmapKey = require('../../lib/data/db population example/keys.json').gmap;
var myApp = angular.module('myApp', ["ui.bootstrap", "ngRoute", "uiGmapgoogle-maps", 'ngMaterial', 'myApp.main',
'myApp.venues', 'myApp.events', 'myApp.venue', 'myApp.event']);

myApp.config(function($routeProvider, $locationProvider){
    $routeProvider

    //need to include the prerender io settings
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
      $locationProvider.hashPrefix('!');
    
});




