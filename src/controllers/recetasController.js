import  Receta  from '../models/Recetas.js';
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
        const { nombre, descripcion, ingredientes, preparacion, imagen } = req.body;
        const receta = new Receta({
            nombre,
            descripcion,
            ingredientes,
            preparacion,
            
            imagen
        });
        receta.save()
            .then(receta => {
                res.json(receta);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //Obtener una receta
    getReceta: (req, res) => {
        const { id } = req.params;
        return res.render('recetas/detalle');

        // Receta.findById(id)
        //     .then(receta => {
        //         res.render('recetas/detalle', { receta });
        //     })
        //     .catch(err => {
        //         res.json(err);
        //     });
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
    getRecetasByCategoria: (req, res) => {
        const { categoria } = req.params;

        // res.render('recetas/recetas');
        res.render('recetas/recetas2');
        // Receta.find({ categoria })
        //     .then(recetas => {
        //         res.send('reecetas/recetas', { recetas });
        //     })
        //     .catch(err => {
        //         res.json(err);
        //     });
    },
    //Obtener recetas por nombre
    getRecetasByNombre: (req, res) => {
        const { nombre } = req.params;
        Receta.find({ nombre })
            .then(recetas => {
                res.json(recetas);
            })
            .catch(err => {
                res.json(err);
            });
    },
}