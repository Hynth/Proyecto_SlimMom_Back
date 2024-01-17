// /src/controllers/authController.js
const Usuario = require('../modelos/usuarioModelo');
const bcrypt = require('bcrypt');

// Controlador para el registro de usuarios
exports.registroUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Hash de la contraseña antes de guardarla en la base de datos
    const hashContraseña = await bcrypt.hash(contraseña, 10);

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña: hashContraseña,
    });

    // Guardar en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Controlador para el inicio de sesión
exports.loginUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(
      contraseña,
      usuario.contraseña
    );

    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
