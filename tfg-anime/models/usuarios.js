class Usuario {
    constructor(id, username, email, password, rol) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password; // Hash de bcrypt
        this.rol = rol;
    }

    // Método para devolver los datos sin la contraseña
    obtenerPerfilPublico() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            rol: this.rol
        };
    }
}

module.exports = Usuario;