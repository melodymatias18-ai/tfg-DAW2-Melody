const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios');

router.post('/registro', usuariosController.registro);
router.post('/login', usuariosController.login);

module.exports = router;