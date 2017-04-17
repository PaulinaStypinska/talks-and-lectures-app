'use strict';
//var gmapKey = require('../../lib/data/db population example/keys.json').gmap;
angular.module('myApp', ["infinite-scroll", "ui.bootstrap", "ui.router", "uiGmapgoogle-maps", 'ngMaterial', 'myApp.main',
'myApp.event','myApp.events','myApp.venue','myApp.venues', 'myApp.filters', 'myApp.services', 'myApp.directives'])

.config(function($stateProvider, $locationProvider, $mdThemingProvider){

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('light-blue');


    //need to include the prerender io settings
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
      $locationProvider.hashPrefix('!');
});





