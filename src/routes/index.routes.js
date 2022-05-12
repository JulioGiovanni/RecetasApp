// Este routes/index.js es para todas las rutas que no tienen que ver con crear,editar o eliminar alguna receta.
// Solo va a mostar las páginas de inicio, login, registro, etc.

import express from "express";

import {indexController as IC} from "../controllers/indexController.js";
import { recetasController as RC } from "../controllers/recetasController.js";
import { alreadyAuthenticated, isAdmin, isAuthenticated } from "../middlewares/auth.js";


//Create the router
const router = express.Router();

router.get('/',IC.HomePage)
router.get('/login',alreadyAuthenticated,IC.Login)
router.get('/register',alreadyAuthenticated,IC.Register)
router.get('/profile',isAuthenticated,IC.Profile)
router.get('/newRecipe',isAuthenticated,IC.NewRecipe)
router.get('/newcategory',isAdmin,IC.NewCategory)
router.get('/busqueda',RC.getRecetasByNombre)
router.get('/myrecipes',isAuthenticated,RC.getRecetasByUsuario)

export default router;