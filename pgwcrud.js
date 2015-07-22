
var crud = require('./crud4venues.js');


crud.create('venues', ['id serial PRIMARY KEY', 'streetname CHAR(30) NOT NULL', 'postcode CHAR(10) NOT NULL']);
crud.update('venues', ['streetname', 'postcode'],['baker street', 'wc11']);
crud.retrieve('venues');
crud.drop('venues');