-- data/sample.sql
CREATE DATABASE indesign_db;

USE indesign_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    role VARCHAR(100)
);

INSERT INTO users (name, role) VALUES
('Arun', 'Designer'),
('Meena', 'Editor'),
('Raj', 'Developer');