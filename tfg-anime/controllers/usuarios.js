const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const CLAVE_TOKEN = "mi_secreto_tfg_2026";

exports.registro = async (req, res) => {
    const { username, email, password } = req.body;
    const passwordHashed = await bcrypt.hash(password, 10);
    db.query('INSERT INTO usuarios (username, email, password, rol) VALUES (?, ?, ?, ?)', 
    [username, email, passwordHashed, 'usuario'], (err) => {
        if (err) return res.status(500).json({ status: "error", msg: "Error en registro" });
        res.json({ status: "success", msg: "Usuario creado" });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (results.length === 0) return res.status(400).json({ msg: "Usuario no existe" });
        const esValida = await bcrypt.compare(password, results[0].password);
        if (!esValida) return res.status(400).json({ msg: "Contraseña incorrecta" });

        const token = jwt.sign({ id: results[0].id, rol: results[0].rol }, CLAVE_TOKEN, { expiresIn: '2h' });
        res.json({ status: "success", token, rol: results[0].rol });
    });
};