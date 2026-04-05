const db = require('../db');

// --- 1. OBTENER COMENTARIOS (Visualización Dinámica) ---
// Puede filtrar por noticia_id o por tema_id
exports.obtenerComentarios = (req, res) => {
    const { noticia_id, tema_id } = req.query;
    let sql = 'SELECT * FROM comentarios WHERE 1=1';
    let params = [];

    if (noticia_id) {
        sql += ' AND noticia_id = ?';
        params.push(noticia_id);
    } else if (tema_id) {
        sql += ' AND tema_id = ?';
        params.push(tema_id);
    }

    db.query(sql + ' ORDER BY fecha_creacion DESC', params, (err, results) => {
        if (err) return res.status(500).json({ status: "error", msg: "Error al obtener foro" });
        
        res.json({
            status: "success",
            data: results
        });
    });
};

// --- 2. SUBIR COMENTARIO / FOTO (Validación - REQUISITO SUBTAREA 2) ---
exports.crearComentario = (req, res) => {
    const { usuario_id, contenido, noticia_id, tema_id, imagen_url } = req.body;

    // VALIDACIÓN 1: El servidor comprueba campos obligatorios
    if (!usuario_id || !contenido) {
        return res.status(400).json({
            status: "error",
            msg: "El ID de usuario y el contenido del mensaje son obligatorios."
        });
    }

    // VALIDACIÓN 2: Evitar comentarios demasiado largos o vacíos (Espacios en blanco)
    if (contenido.trim().length === 0 || contenido.length > 1000) {
        return res.status(400).json({
            status: "error",
            msg: "El comentario debe tener entre 1 y 1000 caracteres."
        });
    }

    // PROCESAMIENTO
    const sql = 'INSERT INTO comentarios (usuario_id, contenido, noticia_id, tema_id, imagen_url) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [usuario_id, contenido, noticia_id || null, tema_id || null, imagen_url || null], (err, result) => {
        if (err) {
            return res.status(500).json({ 
                status: "error", 
                msg: "Error al publicar en el foro." 
            });
        }

        // RESPUESTA ESTRUCTURADA JSON
        // El cliente usa esto para "pintar" el nuevo comentario al instante
        res.status(201).json({
            status: "success",
            msg: "Comentario publicado con éxito",
            data: {
                id: result.insertId,
                usuario_id,
                contenido,
                fecha: new Date().toISOString()
            }
        });
    });
};

// --- 3. ELIMINAR COMENTARIO (Moderación) ---
exports.eliminarComentario = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM comentarios WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ status: "error", msg: "No se pudo borrar" });
        
        res.json({ 
            status: "success", 
            msg: "Comentario eliminado por el moderador." 
        });
    });
};