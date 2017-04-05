'use strict';

angular.module('myApp.remove-duplicates', ["ui.bootstrap", "ngRoute", "uiGmapgoogle-maps", 'ngMaterial'])

    .filter("removeDups", function(){
        return function(data) {
            if(angular.isArray(data)) {
                var result = [];
                var key = {};
                for(var i=0; i<data.length; i++) {
                    var val = data[i];
                    if(angular.isUndefined(key[val])) {
                        key[val] = val;
                        result.push(val);
                    }
                }
                if(result.length > 0) {
                    return result;
                }
            }
            return data;
        }
    });