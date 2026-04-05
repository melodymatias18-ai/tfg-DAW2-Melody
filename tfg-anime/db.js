const mysql = require('mysql2');

// Configuración de la conexión a tu base de datos de anime
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Usuario por defecto de XAMPP
    password: '',      // Contraseña por defecto (vacía)
    database: 'anime_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }
    console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;