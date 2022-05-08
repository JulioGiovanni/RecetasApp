import pkg from 'mongoose';
const  { Schema, model } = pkg;

const RolSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
  

},{
    timestamps: true
});

export default model('Rol', RolSchema);