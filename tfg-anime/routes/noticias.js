const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticias'); 
// 1. IMPORTANTE: Tienes que importar el verificador aquí arriba
const { verificarAdmin } = require('../middleware/authMiddleware'); 

// --- RUTAS ---

// Obtener noticias: Cualquiera puede verlas (sin verificarAdmin)
router.get('/', noticiasController.obtenerTodas);

// Crear noticia: Solo el Admin (con verificarAdmin)
router.post('/', verificarAdmin, noticiasController.crearNoticia);

// Borrar noticia: Solo el Admin (con verificarAdmin)
// ¡Solo dejamos UNA línea para el delete!
router.delete('/:id', verificarAdmin, noticiasController.eliminarNoticia);

module.exports = router;