// models/Anime.js

class Anime {
    // El constructor define qué "características" tiene un Anime
    constructor(id, titulo, sinopsis, genero, tipo, imagen_url) {
        this.id = id;
        this.titulo = titulo;
        this.sinopsis = sinopsis;
        this.genero = genero;
        this.tipo = tipo; // 'Serie' o 'Pelicula'
        this.imagen_url = imagen_url;
    }

    // Un método es una "acción" o lógica que hace la clase
    // Por ejemplo: resumir la sinopsis para que no sea muy larga en la lista
    obtenerResumen() {
        if (this.sinopsis.length > 100) {
            return this.sinopsis.substring(0, 100) + "...";
        }
        return this.sinopsis;
    }

    // Otro método: Comprobar si es apto para la sección de películas
    esPelicula() {
        return this.tipo === 'Pelicula';
    }
}

// Exportamos la clase para usarla en el servidor
module.exports = Anime;