class Valoracion {
    constructor(id, anime_id, usuario_id, puntuacion, comentario, fecha) {
        this.id = id;
        this.anime_id = anime_id;
        this.usuario_id = usuario_id;
        this.puntuacion = puntuacion;
        this.comentario = comentario;
        this.fecha = fecha;
    }

    // MÉTODO POO: Para verificar si la puntuación es excelente (5 estrellas)
    esExcelente() {
        return this.puntuacion === 5;
    }

    // MÉTODO POO: Para obtener un texto amigable de la puntuación
    obtenerTextoPuntuacion() {
        return `Puntuación: ${this.puntuacion} / 5`;
    }
}

module.exports = Valoracion;