const express = require('express');
const router = express.Router();
const db = require('../db');

// Insertar distancia
router.post('/', (req, res) => {
    const { id_usuario, distancia_cm } = req.body;
    const sql = 'INSERT INTO distancias (id_usuario, distancia_cm) VALUES (?, ?)';
    db.query(sql, [id_usuario, distancia_cm], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id_distancias: result.insertId, mensaje: 'Distancia registrada' });
    });
});

// routes/distancias.js
router.get('/:id_usuario', (req, res) => {
    const sql = 'SELECT * FROM distancias WHERE id_usuario = ? ORDER BY timestamp DESC';
    db.query(sql, [req.params.id_usuario], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;
