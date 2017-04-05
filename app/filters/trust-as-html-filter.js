'use strict';

angular.module('myApp.trust-as-html-filter', ["ui.bootstrap", "ngRoute", "uiGmapgoogle-maps", 'ngMaterial'])


.filter('trustThis', ['$sce', function ($sce){
    return function (pieceOfHTML){
        return $sce.trustAsHtml(pieceOfHTML);
    }
}]);