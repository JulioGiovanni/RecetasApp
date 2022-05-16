import path  from 'path'; //Para usar las rutas de archivos
import Receta from '../models/Recetas.js';
import Usuario from '../models/Usuario.js';
import Categoria from '../models/Categoria.js';


export const recetasController = {
    //Ver todas las recetas
    getAllRecetas: (req, res) => {
        Receta.find()
            .then(recetas => {
                res.json(recetas);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //Crear una receta
    createReceta: (req, res) => {
        const { nombre, descripcion, ingredientes, preparacion,categoria,servings,tiempo,usuario, } = req.body;
        const name = req.file.originalname.split('.');
        const receta = new Receta({
            nombre,
            descripcion,
            ingredientes,
            preparacion,
            imagen:'src/public/uploads/' + name[0] + '-' + path.extname(req.file.originalname),
            categoria,
            usuario,
            servings,
            tiempo,
        });
        receta.save()
            .then(receta => {
                res.redirect('/recetas/detalle/' + receta._id);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //Obtener una receta
    getReceta: async(req, res) => {
        const { id } = req.params;
        const receta = await Receta.findById(id);
        let usuario = null
         if (req.user){
            usuario = await Usuario.findById(req.user.id)
         }
            res.render('recetas/detalle', { receta, usuario });
     
       
        },
    //Actualizar una receta
    updateReceta: async (req, res) => {
        const { id } = req.params;
        const usuario = req.user;
        const receta = await Receta.findById(id)
        const { nombre, descripcion, ingredientes, preparacion,categoria,servings,tiempo, } = req.body;
        const name = req.file.originalname.split('.');
       await  Receta.findByIdAndUpdate(id, {
            nombre,
            descripcion,
            ingredientes,
            preparacion,
            imagen:'src/public/uploads/' + name[0] + '-' + path.extname(req.file.originalname),
            categoria,
            servings,
            tiempo,
        }, {
            new: true
        })
           res.redirect('recetas/detalle', { receta,usuario });
    },
    //Eliminar una receta
    deleteReceta: (req, res) => {
        const { id } = req.params;
        Receta.findByIdAndRemove(id)
            .then(() => {
                res.redirect('back');
            })
            
    },
    //Obtener recetas por categoria
    getRecetasByCategoria: async(req, res) => {
        const { categoria } = req.params;
        const recetas = await Receta.find({ categoria })
        let usuario = null
        if (req.user){
           usuario = await Usuario.findById(req.user.id)
        }
        return res.render('recetas/recetas2', { recetas, usuario });
        
        // res.render('recetas/recetas');
     
    },
    //Obtener recetas por nombre
    getRecetasByNombre: async(req, res) => {

        const query =req.url.split('?')[1];
        const recetas = await Receta.find({ query })
        let usuario = null
        if (req.user){
           usuario = await Usuario.findById(req.user.id)
        }
            res.render('recetas/buscar', { recetas, usuario });
      
    },

    getRecetasByUsuario: async(req, res) => {
        const usuario = await Usuario.findById(req.user.id);
        const recetas = await Receta.find({usuario}  );
        res.render('recetas/recetas2', { recetas, usuario });

    },
    editReceta: async(req, res) => {
        const { id } = req.params;
        const receta = await Receta.findById(id);
        const cat = await Categoria.findOne(receta.categoria);
        const categorias = await  Categoria.find({});
        const usuario = await Usuario.findById(req.user.id);
        res.render('recetas/editarReceta', { receta, cat,categorias,usuario });
        
    }
}