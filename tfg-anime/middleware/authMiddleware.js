const jwt = require('jsonwebtoken');

exports.verificarAdmin = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ status: "error", msg: "No hay cabecera de autorización" });
    }

    // Limpieza total: quitamos 'Bearer ' si existe y eliminamos espacios en blanco
    const token = authHeader.replace('Bearer ', '').trim();

    try {
        // Usamos la clave exacta de tu controlador
        const cifrado = jwt.verify(token, "mi_secreto_tfg_2026");
        
        if (cifrado.rol !== 'admin') {
            return res.status(403).json({ 
                status: "error", 
                msg: "Acceso denegado. Se requieren permisos de administrador." 
            });
        }

        req.usuario = cifrado;
        next();
    } catch (error) {
        // Si llegamos aquí, imprimimos el error en la CONSOLA de VS Code para ver qué pasa
        console.error("Error validando token:", error.message);
        res.status(401).json({ status: "error", msg: "Token no válido" });
    }
};