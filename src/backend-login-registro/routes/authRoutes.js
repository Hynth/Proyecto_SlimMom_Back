const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/registro', authController.register);
router.post('/inicio-sesion', authController.login);

router.get('/perfil', authMiddleware, (req, res) => {
  //obtener y enviar datos de el usuario
  res.json({ userId: req.userId });
});

module.exports = router;
