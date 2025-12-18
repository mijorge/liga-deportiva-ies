const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Movido arriba con los demás

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

// 1. CONEXIÓN A MONGO (He añadido /liga para que cree esa base de datos)
const dbURI = 'mongodb+srv://admin:admin123@cluster0.5xu7m4p.mongodb.net/liga?retryWrites=true&w=majority'; 

mongoose.connect(dbURI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.log('Error de conexión:', err));

// 2. ESQUEMA
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String, 
  rol: String 
});
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// 3. RUTAS API
app.post('/api/registro', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email, password });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
});

// 4. SERVIR ANGULAR (IMPORTANTE: Esto va DESPUÉS de las rutas API)
const carpetaAngular = path.join(__dirname, 'dist/liga-deportiva/browser');
app.use(express.static(carpetaAngular));

// Usamos una expresión regular compatible con versiones nuevas de Express
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(carpetaAngular, 'index.html'));
});

// 5. PUERTO (SOLO UNA VEZ)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor en puerto ${PORT}`);
});