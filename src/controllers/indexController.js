import Categoria from "../models/Categoria.js";
import Recetas from "../models/Recetas.js";
import Usuario from "../models/Usuario.js";

//Página principal
export const indexController = {

     HomePage: async(req,res) =>{
        if(req.user){
            const usuario = await Usuario.findById(req.user.id)
            //Obtener las últimas 3 recetas creadas
            const recetas = await Recetas.find({}).sort({_id:-1}).limit(3);
            const categorias = await Categoria.find({});
            res.render('home',{usuario,recetas,categorias});
        }else{
            const recetas = await Recetas.find({}).sort({_id:-1}).limit(3);
            const categorias = await Categoria.find({});
            res.render('home',{recetas,categorias});
        }
        
    },
    //Inicio de sesión
     Login: (req,res) => {
        res.render('usuarios/inicio');
    },
    //Inicio de sesión
     Register: (req,res) => {
        res.render('usuarios/registro');
    },
    //Perfil
    Profile: async (req,res) => {
        const user = req.user;
        const usuario = await Usuario.findById(req.user.id)
        const recetas = await Recetas.find({usuario: usuario.id})
        console.log(recetas);
        res.render('usuarios/perfil',{usuario,recetas});
    },
    //Nueva Receta
    NewRecipe: async (req,res) => {
        const categorias = await Categoria.find({});
        const user = req.user;
        const usuario = await Usuario.findById(user.id)

        res.render('recetas/nuevaReceta',{usuario,categorias});
    },

    NewCategory: async (req,res) => {
        const user = req.user;
        const usuario = await Usuario.findById(user.id)
        res.render('recetas/nuevaCategoria',{usuario});
    }

}


