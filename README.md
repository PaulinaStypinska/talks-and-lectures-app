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
