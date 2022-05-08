import pkg from 'mongoose';
const  { Schema, model } = pkg;

const RecetaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    ingredientes: {
        type: String,
        required: true
    },
    preparacion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId, ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'Usuario',
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    tiempo: {
        type: Number,
        required: true
    }

},
{
    timestamps: true
});

export default model('Receta', RecetaSchema);