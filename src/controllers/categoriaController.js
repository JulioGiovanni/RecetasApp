import  Categoria  from '../models/Categoria.js';
import path  from 'path'; //Para usar las rutas de archivos



export const categoriaController = {
    
    //Obtener todas las categorías
    getCategorias: async (req, res) => {
        const categorias = await Categoria.find();
        res.json(categorias);
    },

    //Crear una categoría
    createCategoria: async (req, res) => {
        const { nombre } = req.body;
        const name = req.file.originalname.split('.');

        const categoria = new Categoria({
            nombre,
            imagen:'src/public/uploads/' + name[0] + '-' + path.extname(req.file.originalname),
        });
        await categoria.save();
        res.redirect('/recetas/'+categoria.id);
    }
}