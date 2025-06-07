const express = require('express');
const router = express.Router();
const db = require('../db');

// Insertar alerta de emergencia
router.post('/', (req, res) => {
    const { id_usuario, latitud, longitud } = req.body;
    const sql = 'INSERT INTO alertas_emergencia (id_usuario, latitud, longitud) VALUES (?, ?, ?)';
    db.query(sql, [id_usuario, latitud, longitud], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id_alertas_emergencia: result.insertId, mensaje: 'Alerta de emergencia enviada' });
    });
});

// Obtener alertas de un usuario
router.get('/:id_usuario', (req, res) => {
    const sql = 'SELECT * FROM alertas_emergencia WHERE id_usuario = ? ORDER BY timestamp DESC';
    db.query(sql, [req.params.id_usuario], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;
