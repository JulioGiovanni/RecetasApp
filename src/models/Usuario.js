import pkg from 'mongoose';
const  { Schema, model } = pkg;

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true

    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: Schema.Types.ObjectId, ref: 'Rol',
        required: true
    },
    imagen: {
        type: String,
        required: true
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

export default model('Usuario', UsuarioSchema);