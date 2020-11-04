CREATE TABLE Author (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR NOT NULL,
	family_name VARCHAR NOT NULL,
	date_of_birth DATE,
	date_of_death DATE,
    full_name VARCHAR GENERATED ALWAYS AS (family_name || ' ' || first_name) STORED,
    lifespan INTEGER GENERATED ALWAYS AS (date_of_death - date_of_birth) STORED,
    url VARCHAR GENERATED ALWAYS AS ('/catalog/author/' || id) STORED,
	PRIMARY KEY (id)
);

CREATE TABLE Book (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR NOT NULL,
	author INT NOT NULL,
	summary VARCHAR NOT NULL,
	isbn VARCHAR NOT NULL,
	genre INT,
    url VARCHAR GENERATED ALWAYS AS ('/catalog/book/' || id) STORED,
	PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES Author(id),
    FOREIGN KEY (genre) REFERENCES Genre(id)
);

CREATE TYPE instance_status AS
ENUM('Available', 'Maintenance', 'Loaned', 'Reserved');

CREATE TABLE BookInstance (
	id INT NOT NULL AUTO_INCREMENT,
	book INT NOT NULL,
	imprint VARCHAR NOT NULL,
	instance_status instance_status NOT NULL DEFAULT 'Maintenance',
	due back DATE DEFAULT NOW,
    url VARCHAR GENERATED ALWAYS AS ('/catalog/bookinstance/' || id) STORED,
	PRIMARY KEY (id),
    FOREIGN KEY (book) REFERENCES Book(id)
);

CREATE TABLE Genre (
	id INT NOT NULL AUTO_INCREMENT,
    genre_name VARCHAR NOT NULL,
    url VARCHAR GENERATED ALWAYS AS ('/catalog/genre/' || id) STORED,
	PRIMARY KEY (id)
)