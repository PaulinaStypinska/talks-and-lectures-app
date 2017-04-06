'use strict';

angular.module('myApp.filters.trust-as-html-filter', [])


.filter('trustThis', ['$sce', function ($sce){
    return function (pieceOfHTML){
        return $sce.trustAsHtml(pieceOfHTML);
    }
}]);