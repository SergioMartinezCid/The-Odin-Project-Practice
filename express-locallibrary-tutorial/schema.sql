CREATE TABLE Author (
	id SERIAL,
	first_name VARCHAR NOT NULL,
	family_name VARCHAR NOT NULL,
	date_of_birth DATE,
	date_of_death DATE,
	PRIMARY KEY (id)
);

CREATE TABLE Genre (
	id SERIAL,
    genre_name VARCHAR NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Book (
	id SERIAL,
	title VARCHAR NOT NULL,
	author INTEGER NOT NULL,
	summary VARCHAR NOT NULL,
	isbn VARCHAR NOT NULL,
	genre INTEGER,
	PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES Author(id),
    FOREIGN KEY (genre) REFERENCES Genre(id)
);

CREATE TYPE instance_status AS
ENUM('Available', 'Maintenance', 'Loaned', 'Reserved');

CREATE TABLE BookInstance (
	id SERIAL,
	book INTEGER NOT NULL,
	imprint VARCHAR NOT NULL,
	instance_status instance_status NOT NULL DEFAULT 'Maintenance',
	due_back DATE DEFAULT now(),
	PRIMARY KEY (id),
    FOREIGN KEY (book) REFERENCES Book(id)
);
