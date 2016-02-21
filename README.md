[![Build Status](https://travis-ci.org/PaulinaStypinska/talks-and-lectures-app.svg)](https://travis-ci.org/PaulinaStypinska/talks-and-lectures-app)

A full-stack website for all seminars, talks & lectures in London. [Feel free to take a look.] (https://secure-fortress-51530.herokuapp.com/)

Requirements:

- [PostgreSQL] (http://www.postgresql.org/download/)
- [node-postgres] (https://github.com/brianc/node-postgres)
- [Node] (https://nodejs.org/en/)
- [Express] (http://expressjs.com/)
- [Angular] (https://angularjs.org/)


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

    psql postgres < createDatabase.sql 
    
Testing
-------
     npm install -g mocha
     mocha


