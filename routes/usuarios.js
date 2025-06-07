const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear usuario
router.post('/', (req, res) => {
    const { nombre, correo, contraseña_hash, rol } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, correo, contraseña_hash, rol) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, correo, contraseña_hash, rol], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id_usuarios: result.insertId, mensaje: 'Usuario creado' });
    });
});

// Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;
