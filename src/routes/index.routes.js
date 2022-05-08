// Este routes/index.js es para todas las rutas que no tienen que ver con crear,editar o eliminar alguna receta.
// Solo va a mostar las páginas de inicio, login, registro, etc.

import express from "express";

import {indexController as IC} from "../controllers/indexController.js";


//Create the router
const router = express.Router();

router.get('/',IC.HomePage)
router.get('/login',IC.Login)
router.get('/register',IC.Register)
router.get('/profile',IC.Profile)

export default router;