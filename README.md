[![Build Status](https://travis-ci.org/PaulinaStypinska/talks-and-lectures-app.svg)](https://travis-ci.org/PaulinaStypinska/talks-and-lectures-app)

A full-stack website for all seminars, talks & lectures in London. [It is now hosted on Heroku. Click here to take a look.] (https://secure-fortress-51530.herokuapp.com/)

You can also run it locally by following the instructions below.

Requirements:

- [PostgreSQL] (http://www.postgresql.org/download/)
- [Node] (https://nodejs.org/en/)
- [Express] (http://expressjs.com/)
- [Angular] (https://angularjs.org/), among others.

# How to run this locally

#### Make sure you have postgreSQL installed on your system.
You can follow the steps below for a Mac installation or go to the [PostgreSQL site] (http://www.postgresql.org/download/) to configure and set it up.

You will need postgreSQL version 9.5.

######Postgresql on Mac OSX

Install Postgresql

    brew install postgresql
    initdb /usr/local/var/postgres

Start Postgresql

    pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
    
Stop Postgresql

    pg_ctl -D /usr/local/var/postgres stop

######Setup

Create database

    psql postgres < createDatabase.sql 
 
#### Run npm install in your command window to install your dependencies

#### Configure a dotenv file.
For full information, see [the dotenv npm site] (https://www.npmjs.com/package/dotenv) file. The only process.env variable you will need for this is process.env.DATABASE_URL which is essential for your tests. Locally this should be configured to your user and password.
You may not need to configure your API keys for this.

#### Run npm test in your command window.
This will populate your database with test data and ensure all queries are passing the tests.

#### Run npm start. 
And open your browser at localhost:8080. Test data should be displayed.


# A few words on the setup, ie a process breakdown

#### Database

I am using an object-relational database system (PostgreSQL). I have used mongoDB in the past, but have decided to go with postgreSQL for this project. I have wanted to use a relational database, and postgreSQL also offers very good data validity checks and ability to store JSON data, should I want to.

Here is an example of table setup:

```
var createLectureTable = 'create table lecture \ \
                       ( \
                        lid int primary key not null, \
                        title text not null, \
                        venue_id int references venue(vid) on delete set null, \
                        tag_id int references tag(tid) on delete set null not null, \
                        datetime timestamp, \
                        url text, \
                        description text, \
                        UNIQUE (url, datetime)\
                      );\
                      drop sequence if exists lecture_lid_seq;\
                      create sequence lecture_lid_seq;\
                      alter table lecture alter column lid set default nextval(\'lecture_lid_seq\')';
```

#### Node

I use [node-postgres] (https://github.com/brianc/node-postgres) as a client for postgreSQL. I have created a 

