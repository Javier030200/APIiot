const express = require('express');
const router = express.Router();
const db = require('../db');

// Insertar ubicación GPS
router.post('/', (req, res) => {
    const { id_usuario, latitud, longitud } = req.body;
    const sql = 'INSERT INTO gps (id_usuario, latitud, longitud) VALUES (?, ?, ?)';
    db.query(sql, [id_usuario, latitud, longitud], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id_gps: result.insertId, mensaje: 'Ubicación registrada' });
    });
});

router.get('/:id_usuario', (req, res) => {
    const sql = 'SELECT * FROM gps WHERE id_usuario = ? ORDER BY timestamp DESC';
    db.query(sql, [req.params.id_usuario], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;
