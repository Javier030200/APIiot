const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,        // Ejemplo: mysql-merejildoiot.alwaysdata.net
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,        // Ejemplo: 417049_merejildo
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false    // Esto desactiva la verificación estricta SSL (útil si AlwaysData usa SSL auto firmado)
    }
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida correctamente.');
});

module.exports = connection;
