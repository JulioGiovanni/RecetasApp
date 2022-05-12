import pkg from 'mongoose';
import bcrypt from 'bcryptjs';
const  { Schema, model } = pkg;

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true

    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        default: 'usuario'
    },
    imagen: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    bio: {
        type: String,
        required: false
    }

},{
    timestamps: true
});


UsuarioSchema.methods.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(password, salt);
}

UsuarioSchema.methods.comparePassword = function(password) {
    return  bcrypt.compareSync(password, this.contrasena);
}




export default model('Usuario', UsuarioSchema);