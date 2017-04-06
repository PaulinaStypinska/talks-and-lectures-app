'use strict';

angular.module('myApp.filters', [
    'myApp.filters.remove-duplicates-filter',
    'myApp.filters.trust-as-html-filter'
])

    .value('filters', '0.1')
