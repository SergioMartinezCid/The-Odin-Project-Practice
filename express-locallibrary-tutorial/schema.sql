CREATE TABLE `Author` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR NOT NULL,
	`family_name` VARCHAR NOT NULL,
	`date_of_birth` DATE,
	`date_of_death` DATE,
    `name` VARCHAR GENERATED ALWAYS AS (`family_name` || ' ' || `first_name`) STORED,
    `lifespan` INTEGER GENERATED ALWAYS AS (`date_of_death` - `date_of_birth`) STORED,
    `url` VARCHAR GENERATED ALWAYS AS ('/catalog/author/' || `id`) STORED,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Book` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`title` VARCHAR NOT NULL,
	`author` INT NOT NULL COMMENT 'Foreign key',
	`summary` VARCHAR NOT NULL,
	`isbn` VARCHAR NOT NULL,
	`genre` INT COMMENT 'Foreign key',
    `url` VARCHAR GENERATED ALWAYS AS (`/catalog/book/` || `id`) STORED,
	PRIMARY KEY (`id`)
);

CREATE TYPE status AS
ENUM('Available', 'Maintenance', 'Loaned', 'Reserved');

CREATE TABLE `BookInstance` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`book` INT NOT NULL COMMENT 'Foreign key',
	`imprint` VARCHAR NOT NULL,
	`status` status NOT NULL DEFAULT 'Maintenance',
	`due back` DATE DEFAULT NOW,
    `url` VARCHAR GENERATED ALWAYS AS (`/catalog/bookinstance/` || `id`) STORED,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Genre` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR NOT NULL,
    `url` VARCHAR GENERATED ALWAYS AS (`/catalog/genre/` || `id`) STORED,
	PRIMARY KEY (`id`)
)