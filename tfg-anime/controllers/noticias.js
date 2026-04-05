const db = require('../db');
const Noticia = require('../models/noticias'); // Asegúrate de que el nombre del archivo sea noticia.js (en singular)

// --- 1. OBTENER NOTICIAS (Visualización Dinámica) ---
exports.obtenerTodas = (req, res) => {
    // Ordenamos por la columna real de tu base de datos: fecha_publicacion
    db.query('SELECT * FROM noticias ORDER BY fecha_publicacion DESC', (err, results) => {
        if (err) return res.status(500).json({ 
            status: "error", 
            msg: "Error al recuperar las noticias de la base de datos" 
        });

        // MAPEAMOS LOS RESULTADOS:
        // n.imagen_noticia se guarda en 'imagen' del modelo
        // n.fecha_publicacion se guarda en 'fecha' del modelo
        const lista = results.map(n => 
            new Noticia(n.id, n.titulo, n.contenido, n.imagen_noticia, n.fecha_publicacion)
        );

        // Respuesta estructurada JSON para el Frontend
        res.json({ 
            status: "success", 
            data: lista 
        });
    });
};

// --- 2. CREAR NOTICIA (Validación de Formulario - REQUISITO SUBTAREA 2) ---
exports.crearNoticia = (req, res) => {
    // Recibimos la información del formulario (vía body)
    const { titulo, contenido, imagen_noticia } = req.body;

    // VALIDACIÓN: El servidor comprueba los datos antes de insertar
    if (!titulo || !contenido) {
        return res.status(400).json({
            status: "error",
            msg: "El título y el contenido son campos obligatorios para publicar una noticia."
        });
    }

    // Insertamos en las columnas reales de tu tabla 'noticias'
    const sql = 'INSERT INTO noticias (titulo, contenido, imagen_noticia) VALUES (?, ?, ?)';
    db.query(sql, [titulo, contenido, imagen_noticia || null], (err, result) => {
        if (err) {
            return res.status(500).json({ 
                status: "error", 
                msg: "Error interno al intentar guardar la noticia." 
            });
        }

        // Respuesta JSON tras éxito (Código 201: Creado)
        res.status(201).json({
            status: "success",
            msg: "Noticia publicada correctamente",
            data: { id: result.insertId, titulo }
        });
    });
};

// --- 3. ELIMINAR NOTICIA (Gestión Admin) ---
exports.eliminarNoticia = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM noticias WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ status: "error", msg: "Error al intentar eliminar la noticia." });
        
        res.json({ 
            status: "success", 
            msg: "Noticia eliminada correctamente" 
        });
    });
};

