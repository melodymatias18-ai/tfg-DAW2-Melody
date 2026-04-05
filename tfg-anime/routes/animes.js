const express = require('express');
const router = express.Router();
const animesController = require('../controllers/animes'); 


router.get('/', animesController.obtenerTodos);
router.post('/progreso', animesController.actualizarProgreso);
router.put('/:id', animesController.actualizarAnime);

module.exports = router;