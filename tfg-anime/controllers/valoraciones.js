const db = require('../db');

// --- 1. AÑADIR/ACTUALIZAR VALORACIÓN (Validación - REQUISITO SUBTAREA 2) ---
exports.crearValoracion = (req, res) => {
    const { usuario_id, anime_id, puntuacion, comentario } = req.body;

    // VALIDACIÓN: El servidor filtra los datos antes de entrar a la BD
    if (!usuario_id || !anime_id || puntuacion === undefined) {
        return res.status(400).json({
            status: "error",
            msg: "Faltan campos obligatorios: ID de usuario, ID de anime/película y nota."
        });
    }

    // Validar que la nota sea un número entre 1 y 5 (Protocolo de negocio)
    const notaNum = parseInt(puntuacion);
    if (isNaN(notaNum) || notaNum < 1 || notaNum > 5) {
        return res.status(400).json({
            status: "error",
            msg: "La puntuación debe ser un número entero entre 1 y 5."
        });
    }

    // PROCESAMIENTO: REPLACE permite que si el usuario ya votó, se actualice la nota
    const sql = 'REPLACE INTO valoraciones (usuario_id, anime_id, puntuacion, comentario) VALUES (?, ?, ?, ?)';
    db.query(sql, [usuario_id, anime_id, notaNum, comentario || null], (err) => {
        if (err) return res.status(500).json({ status: "error", msg: "Error al guardar la valoración." });

        // RESPUESTA ESTRUCTURADA JSON
        res.status(201).json({
            status: "success",
            msg: "¡Valoración registrada con éxito!",
            data: { anime_id, puntuacion: notaNum }
        });
    });
};

// --- 2. OBTENER NOTA MEDIA (Visualización Dinámica) ---
exports.obtenerMedia = (req, res) => {
    const { id } = req.params; // ID del anime o película

    const sql = 'SELECT AVG(puntuacion) as media, COUNT(*) as total FROM valoraciones WHERE anime_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ status: "error", msg: "Error al calcular la media." });

        // Formateamos la media a un decimal (ej: 4.5)
        const mediaFinal = results[0].media ? parseFloat(results[0].media).toFixed(1) : 0;

        res.json({
            status: "success",
            data: {
                anime_id: id,
                nota_media: mediaFinal,
                votos_totales: results[0].total
            }
        });
    });
};