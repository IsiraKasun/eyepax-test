CREATE DATABASE parker_inc;

USE parker_inc;

CREATE TABLE employee (
    record_id INT AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(75) NOT NULL,
    profile_picture TEXT,
    created_at DATETIME,
    modified_at DATETIME,
    status ENUM('Active', 'Deleted') NOT NULL,
    PRIMARY KEY(record_id)
);


