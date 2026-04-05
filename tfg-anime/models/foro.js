class Post {
    constructor(id, usuario_id, titulo_post, contenido_post, fecha_post) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.titulo_post = titulo_post;
        this.contenido_post = contenido_post;
        this.fecha_post = fecha_post;
    }
}
module.exports = Post;