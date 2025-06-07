const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que este archivo esté correcto
const bcrypt = require('bcrypt');

// Ruta: POST /api/login
router.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' });
    }

    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(sql, [correo], async (err, resultados) => {
        if (err) return res.status(500).json({ mensaje: 'Error en la base de datos.' });

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Correo no registrado.' });
        }

        const usuario = resultados[0];
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña_hash);

        if (!contraseñaValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
        }

        // Devuelve datos básicos del usuario
        res.json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id_usuarios: usuario.id_usuarios,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    });
});

module.exports = router;
