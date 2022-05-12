import pkg from 'mongoose';
const  { Schema, model } = pkg;

const CategoriaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    imagen : {
        type: String,
        required: true
    }

},{
    timestamps: true
});

export default model('Categoria', CategoriaSchema);


