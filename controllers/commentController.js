// Importa MySQL
const mysql = require('mysql2');

// Connessione al database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Modifica con il tuo username MySQL
  password: 'admin', // Modifica con la tua password MySQL
  database: 'Blog'   // Modifica con il nome del tuo database
});

// Connessione al DB
db.connect((err) => {
  if (err) {
    console.error('❌ Errore connessione DB:', err);
  } else {
    console.log('✅ Connesso al database (Comment Controller)');
  }
});

// Funzione per ottenere tutti i commenti
function index(req, res) {
  db.query('SELECT * FROM comments', (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore recupero commenti' });
    res.status(200).json(results);  // Restituisce tutti i commenti
  });
}

// Funzione per ottenere un commento specifico
function show(req, res) {
  const { id } = req.params;  // Estrai l'ID dalla richiesta

  const query = 'SELECT * FROM comments WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Errore recupero commento:', err);
      return res.status(500).json({ error: 'Errore recupero commento' });
    }
    
    if (results.length === 0) {  // Se il commento non esiste, restituisci 404
      return res.status(404).json({ message: 'Commento non trovato' });
    }

    res.status(200).json(results[0]);  // Restituisce il commento trovato
  });
}
function store(req, res) {
  const { nome, commento } = req.body;

  console.log("📩 Dati ricevuti nel backend:", req.body);  // DEBUG

  if (!nome || !commento) {
    return res.status(400).json({ error: "I dati richiesti (nome, commento) sono obbligatori." });
  }

  // ❌ ERRORE ATTUALE: Stai inserendo 'post_id' anche se non esiste
  // db.query('INSERT INTO comments (post_id, nome, commento) VALUES (?, ?, ?)', [post_id, nome, commento], (err, results) => {

  // ✅ SOLUZIONE: Rimuovi 'post_id' dalla query
  db.query('INSERT INTO comments (nome, commento) VALUES (?, ?)', [nome, commento], (err, results) => {
    if (err) {
      console.error('❌ Errore nel salvataggio del commento:', err);
      return res.status(500).json({ error: 'Errore aggiunta commento' });
    }
    console.log("✅ Commento salvato con ID:", results.insertId);  // DEBUG
    res.status(201).json({ id: results.insertId, message: 'Commento aggiunto' });
  });
}



// Funzione per aggiornare un commento esistente
function update(req, res) {
  const { id } = req.params;
  const { nome, commento } = req.body;
  
  db.query('UPDATE comments SET nome = ?, commento = ? WHERE id = ?', [nome, commento], (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore aggiornamento commento' });
    
    if (results.affectedRows === 0) {  // Se non è stato trovato un commento con quell'ID
      return res.status(404).json({ message: 'Commento non trovato' });
    }
    
    res.status(200).json({ message: 'Commento aggiornato' });
  });
}

// Funzione per modificare parzialmente un commento
function modify(req, res) {
  const { id } = req.params;
  const updates = req.body;

  db.query('UPDATE comments SET ? WHERE id = ?', [updates, id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore modifica commento' });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Commento non trovato' });
    }

    res.status(200).json({ message: 'Commento modificato' });
  });
}

// Funzione per eliminare un commento
function destroy(req, res) {
  const { id } = req.params;
  
  db.query('DELETE FROM comments WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore eliminazione commento' });
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Commento non trovato' });
    }

    res.status(200).json({ message: 'Commento eliminato' });
  });
}

// Esporto tutte le funzioni del controller
module.exports = { index, show, store, update, modify, destroy };
