const express = require('express');
const loginRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/usuarios', require('./routes/usuarios'));
app.use('/distancias', require('./routes/distancias'));
app.use('/gps', require('./routes/gps'));
app.use('/alertas', require('./routes/alertas'));
app.use('/api', loginRoutes); // rutas generales de login/registro

// Manejo de rutas no existentes
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.listen(port, () => {
    console.log(`Servidor API corriendo en http://localhost:${port}`);
});
