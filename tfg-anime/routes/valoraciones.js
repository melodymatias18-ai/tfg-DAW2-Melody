const express = require('express');
const router = express.Router();
const valoracionesController = require('../controllers/valoraciones');

// Ruta para enviar una nueva nota (Series o Películas)
router.post('/votar', valoracionesController.crearValoracion);

// Ruta para obtener la media de un anime específico
router.get('/media/:id', valoracionesController.obtenerMedia);

module.exports = router;