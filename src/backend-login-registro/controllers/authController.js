const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const newUser = new User({ nombre, correo, contraseña });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    //verificacion y obtencion de usuario
    const user = await User.findOne({ correo, contraseña });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    //generar token
    const token = jwt.sign({ userId: user._id }, 'secreto', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
