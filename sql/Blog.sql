DROP DATABASE IF EXISTS Blog;
CREATE DATABASE Blog;
USE Blog;

-- Creiamo la tabella per i post (se non esiste già)
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titolo VARCHAR(255) NOT NULL,
  contenuto TEXT NOT NULL,
  data_pubblicazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creiamo la tabella per i commenti senza foreign key
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL, -- Nome dell'autore del commento
  commento TEXT NOT NULL, -- Testo del commento
  data_commento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inseriamo qualche commento di esempio
INSERT INTO comments (nome, commento) 
VALUES 
  ('Mario Rossi', 'Ottimo articolo!'),
  ('Luca Bianchi', 'Mi è piaciuto molto, grazie per la condivisione!'),
  ('Giulia Verdi',' Articoli interessanti!');
  
 

