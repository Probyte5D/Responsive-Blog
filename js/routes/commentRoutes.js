// Importo express
const express = require('express');
const router = express.Router();

// Importa correttamente il controller
const commentController = require('../controllers/commentController');

// Definizione delle rotte per i post
router.get('/', commentController.index);      // Ottieni tutti i post
router.get('/:id', commentController.show);    // Ottieni un singolo post
router.post('/', commentController.store);     // Crea un nuovo post
router.put('/:id', commentController.update);  // Aggiorna completamente un post
router.patch('/:id', commentController.modify);// Modifica parzialmente un post
router.delete('/:id', commentController.destroy); // Elimina un post

// Esporto il router
module.exports = router;
