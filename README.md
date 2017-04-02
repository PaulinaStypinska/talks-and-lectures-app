[![Build Status](https://travis-ci.org/PaulinaStypinska/talks-and-lectures-app.svg)](https://travis-ci.org/PaulinaStypinska/talks-and-lectures-app)

This is a full stack website that helps people find talks and lectures in London based on their location and interests. At the moment, it gets data from meetup and Eventbrite.

Requirements:

- [PostgreSQL](http://www.postgresql.org/download/)
- [node-postgres](https://github.com/brianc/node-postgres)
- [Node](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Angular](https://angularjs.org/)


Postgresql on Mac OSX
-----------------------

Install Postgresql

    brew install postgresql
    initdb /usr/local/var/postgres

Start Postgresql

    pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
    
Stop Postgresql

    pg_ctl -D /usr/local/var/postgres stop

Setup
-----
    
Create database

    psql postgres < app/lib/createDatabase.sql 
    
Testing
-------
     npm install -g mocha
     npm test


