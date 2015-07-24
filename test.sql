
CREATE TABLE venue(
	id serial PRIMARY KEY,
	building VARCHAR (40),
	streetname VARCHAR (30) NOT NULL,
    streetnumber INT,
    postcode VARCHAR (10) NOT NULL,
	email VARCHAR (355) UNIQUE NOT NULL,
    tel INT
);

CREATE TABLE lecture(
    id serial PRIMARY KEY,
    title VARCHAR (30) NOT NULL,
    dateof DATE NOT NULL,
    timeof TIME NOT NULL,
    venue VARCHAR(20) NOT NULL,
    lecturer VARCHAR(20),
    summary VARCHAR(300),
    fee INT
);

CREATE TABLE lecturer(
    firstname VARCHAR(15) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    bio VARCHAR(300)
);

