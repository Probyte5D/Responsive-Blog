DROP DATABASE IF EXISTS Blog;
CREATE DATABASE Blog;
USE Blog;

-- tabella per i post 
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titolo VARCHAR(255) NOT NULL,
  contenuto TEXT NOT NULL,
  data_pubblicazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--tabella per i commenti
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  commento TEXT NOT NULL, 
  data_commento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert
INSERT INTO comments (nome, commento) 
VALUES 
  ('Mario Rossi', 'Ottimo articolo!'),
  ('Luca Bianchi', 'Mi è piaciuto molto, grazie per la condivisione!'),
  ('Giulia Verdi',' Articoli interessanti!');
  
 

