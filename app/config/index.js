'use strict';

var nconf = require('nconf');
var path = require('path');
var fs = require('fs');

nconf.argv().env();

nconf.file({file: path.resolve('config/config.json')});

module.exports = nconf;