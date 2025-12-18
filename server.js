// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Permite que Angular hable con el servidor
app.use(bodyParser.json());

// --- TU CADENA DE MONGODB AQUÍ ---
// Sustituye <password> por tu contraseña real
const dbURI = 'mongodb+srv://admin:admin123@cluster0.5xu7m4p.mongodb.net/?appName=Cluster0'; 

mongoose.connect(dbURI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.log('Error de conexión:', err));

// --- ESQUEMA DE USUARIO (Como pide el PDF) ---
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String, // En la vida real se cifra, aquí lo haremos simple por ahora
  rol: String // "admin", "usuario", "capitan", "arbitro"
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// --- RUTAS (Endpoints) ---

// 1. Registro (POST)
app.post('/api/registro', async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  try {
    const nuevoUsuario = new Usuario({ nombre, email, password, rol });
    await nuevoUsuario.save();
    res.json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar' });
  }
});

// 2. Login (POST) - El PDF dice GET para rescatar, pero por seguridad se suele usar POST para enviar credenciales
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email: email, password: password });
  
  if (usuario) {
    res.json(usuario); // Devolvemos el usuario con su ROL
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// Esto permite que Render elija el puerto automáticamente
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});