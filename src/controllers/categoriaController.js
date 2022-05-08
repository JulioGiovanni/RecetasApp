import  Categoria  from '../models/Categoria.js';



export const categoriaController = {
    
    //Obtener todas las categorías
    getCategorias: async (req, res) => {
        const categorias = await Categoria.find();
        res.json(categorias);
    },

    //Crear una categoría
    createCategoria: async (req, res) => {
        const { nombre } = req.body;
        const categoria = new Categoria({
            nombre
        });
        await categoria.save();
        res.json({
            status: 'Categoría guardada'
        });
    }
}