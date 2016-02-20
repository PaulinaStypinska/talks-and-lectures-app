-- Drop database
drop database if exists talks;

-- Create user
drop user if exists orator;
create user orator createdb createuser password 'password';

-- Create database
create database talks owner orator;
\connect talks;

-- Create table venue
drop table if exists venue;
create table venue
(
  id serial primary key,
  name varchar(40) not null
);

create databa