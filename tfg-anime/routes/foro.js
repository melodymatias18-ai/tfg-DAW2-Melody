const express = require('express');
const router = express.Router();
const foroController = require('../controllers/foro'); // Importamos tu controlador
const { verificarToken, verificarAdmin } = require('../middleware/authMiddleware'); // Si usas JWT

// 1. Obtener comentarios (puedes filtrar por ?noticia_id=1 o ?tema_id=1)
router.get('/', foroController.obtenerComentarios);

// 2. Subir un comentario o foto (Requiere estar logueado)
router.post('/', foroController.crearComentario); 

// 3. Eliminar comentario (Solo para Administradores)
router.delete('/:id', verificarAdmin, foroController.eliminarComentario);

module.exports = router;