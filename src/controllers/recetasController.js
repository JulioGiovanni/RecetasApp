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
        if(req.user){
            const usuario = await Usuario.findById(req.user.id)
            res.render('recetas/detalle', { receta, usuario });
        }
        res.render('recetas/detalle', { receta });
       
        },
    //Actualizar una receta
    updateReceta: (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion, ingredientes, preparacion, imagen } = req.body;
        Receta.findByIdAndUpdate(id, {
            nombre,
            descripcion,
            ingredientes,
            preparacion,
            imagen
        }, {
            new: true
        })
            .then(receta => {
                res.json(receta);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //Eliminar una receta
    deleteReceta: (req, res) => {
        const { id } = req.params;
        Receta.findByIdAndRemove(id)
            .then(receta => {
                res.json(receta);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //Obtener recetas por categoria
    getRecetasByCategoria: async(req, res) => {
        const { categoria } = req.params;
        const recetas = await Receta.find({ categoria })
   
        if(req.user){
            const usuario = await Usuario.findById(req.user.id);
            res.render('recetas/recetas2', { recetas, usuario });
        }else{

            res.render('recetas/recetas2', { recetas,categoria });
        }
        // res.render('recetas/recetas');
     
    },
    //Obtener recetas por nombre
    getRecetasByNombre: async(req, res) => {

        const query =req.url.split('?')[1];
        const recetas = await Receta.find({ query })
        if(req.user){
            const usuario = await Usuario.findById(req.user.id);
            res.render('recetas/buscar', { recetas, usuario });
        }else{   
            res.render('recetas/buscar', { recetas });
        }
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
        console.log(cat)
        res.render('recetas/editarReceta', { receta, cat,categorias,usuario });
        
    }
}