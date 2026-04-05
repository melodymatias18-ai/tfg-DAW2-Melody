const db = require('../db');
const Anime = require('../models/animes');

// --- 1. OBTENER CATÁLOGO (Recuperación) ---
exports.obtenerTodos = (req, res) => {
    db.query('SELECT * FROM animes', (err, results) => {
        if (err) return res.status(500).json({ status: "error", msg: err.message });
        
        const listaAnimes = results.map(a => 
            new Anime(a.id, a.titulo, a.sinopsis, a.genero, a.tipo, a.imagen_url)
        );
        
        res.json({ status: "success", data: listaAnimes });
    });
};

// --- 2. ACTUALIZAR PROGRESO (Consistencia) ---
exports.actualizarProgreso = (req, res) => {
    const { usuario_id, anime_id, episodios_vistos, estado } = req.body;

    if (!usuario_id || !anime_id || episodios_vistos === undefined || !estado) {
        return res.status(400).json({
            status: "error",
            msg: "Faltan datos obligatorios para actualizar el progreso."
        });
    }

    const estadosValidos = ['viendo', 'terminada', 'pendiente'];
    if (!estadosValidos.includes(estado.toLowerCase())) {
        return res.status(400).json({
            status: "error",
            msg: "Estado no válido. Use: viendo, terminada o pendiente."
        });
    }

    const sql = 'REPLACE INTO progreso_usuarios (usuario_id, anime_id, episodios_vistos, estado) VALUES (?, ?, ?, ?)';
    db.query(sql, [usuario_id, anime_id, episodios_vistos, estado.toLowerCase()], (err) => {
        if (err) return res.status(500).json({ status: "error", msg: "Error en la base de datos." });

        res.json({
            status: "success",
            msg: "¡Progreso actualizado correctamente!",
            data: { anime_id, episodios_vistos, estado }
        });
    });
};

// --- 3. EDITAR ANIME (Actualización/Edición - NUEVO) ---
exports.actualizarAnime = (req, res) => {
    const { id } = req.params; // ID que viene en la URL (ej: /api/animes/2)
    const { titulo, sinopsis, genero } = req.body;

    if (!titulo || !sinopsis || !genero) {
        return res.status(400).json({ 
            status: "error", 
            msg: "Faltan campos para la actualización." 
        });
    }

    const sql = 'UPDATE animes SET titulo = ?, sinopsis = ?, genero = ? WHERE id = ?';
    
    db.query(sql, [titulo, sinopsis, genero, id], (err, result) => {
        if (err) return res.status(500).json({ status: "error", msg: err.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: "error", msg: "Anime no encontrado." });
        }

        res.json({ 
            status: "success", 
            msg: "¡Anime actualizado correctamente!" 
        });
    });
};