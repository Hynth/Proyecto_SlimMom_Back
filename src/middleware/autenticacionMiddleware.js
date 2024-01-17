// /src/middleware/autenticacionMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar la autenticación del usuario
module.exports = (req, res, next) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.header('x-auth-token');

  // Verificar si hay un token
  if (!token) {
    return res
      .status(401)
      .json({ mensaje: 'Acceso denegado. No hay token proporcionado' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, 'tu_secreto');
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensaje: 'Token no válido' });
  }
};
