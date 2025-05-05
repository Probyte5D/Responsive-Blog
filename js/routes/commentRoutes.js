// Importo express
const express = require('express');
const router = express.Router();

// Importa correttamente il controller
const commentController = require('../controllers/commentController');

// Definizione delle rotte per i post
router.get('/', commentController.index);      
router.get('/:id', commentController.show);    
router.post('/', commentController.store);     
router.put('/:id', commentController.update);  
router.patch('/:id', commentController.modify);
router.delete('/:id', commentController.destroy);

// Esporto il router
module.exports = router;
