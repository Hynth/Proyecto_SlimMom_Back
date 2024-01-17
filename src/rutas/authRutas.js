// /src/rutas/authRutas.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para registro y login
router.post('/registro', authController.registroUsuario);
router.post('/login', authController.loginUsuario);

module.exports = router;
