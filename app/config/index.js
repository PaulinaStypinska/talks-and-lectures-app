'use strict';

var nconf = require('nconf');
var path = require('path');

nconf.argv().env().file({file:path.resolve('config.json')});

console.log(path.resolve('config/config.json'));

module.exports = {
    get: nconf.get.bind(nconf),
    set: nconf.set.bind(nconf)
};