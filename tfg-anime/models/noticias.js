class Noticia {
    constructor(id, titulo, contenido, imagen, fecha) {
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.imagen = imagen;
        this.fecha = fecha;
    }

    // Método para mostrar la fecha de forma amigable (Ej: 27 de marzo de 2026)
    formatearFecha() {
        return new Date(this.fecha).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
}

module.exports = Noticia;