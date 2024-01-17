const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const dbUrl = process.env.DB_URL;

mongoose.connect(
  'mongodb+srv://warlenromero:AzOXVQJkVQuTCQ56@basegoit.1wn7yh4.mongodb.net/admin?retryWrites=true&w=majority'
);

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
  console.error('Database connection error:', err);
  process.exit(1);
});

const db = mongoose.connection;

//rutas de autenticación
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
