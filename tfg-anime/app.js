const express = require('express');
const cors = require('cors'); // ¡Importante instalarlo: npm install cors!
const app = express();

// --- 1. MIDDLEWARES GLOBALES ---
app.use(cors()); // Permite peticiones desde el navegador (Frontend)
app.use(express.json()); // Permite que el servidor entienda los datos JSON que envías

// --- 2. IMPORTAR RUTAS ---
const noticiasRoutes = require('./routes/noticias');
const usuariosRoutes = require('./routes/usuarios');
const animesRoutes = require('./routes/animes');
const foroRoutes = require('./routes/foro');
const valoracionesRoutes = require('./routes/valoraciones'); // <-- TE FALTABA ESTA

// --- 3. VINCULAR RUTAS ---
app.use('/api/noticias', noticiasRoutes);
app.use('/api/usuarios', usuariosRoutes); 
app.use('/api/animes', animesRoutes);
app.use('/api/foro', foroRoutes);
app.use('/api/valoraciones', valoracionesRoutes); // <-- TE FALTABA ESTA

// --- 4. MANEJO DE ERRORES 404 ---
// Si alguien busca una ruta que no existe, devolvemos un JSON (Subtarea 2)
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        msg: "La ruta solicitada no existe en el servidor de AnimeDB"
    });
});

// --- 5. ARRANQUE DEL SERVIDOR ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(` Servidor corriendo en: http://localhost:${PORT}`);
    console.log(` Base de datos activa: anime_db`);
    console.log(`=========================================`);
});