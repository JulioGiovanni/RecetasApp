

import express from "express";

import {recetasController as RC} from "../controllers/recetasController.js";
import { categoriaController as CC } from "../controllers/categoriaController.js";


//Create the router
const router = express.Router();

router.get('/:categoria',RC.getRecetasByCategoria);
router.post('/',CC.createCategoria);
router.get('/detalle/:id',RC.getReceta);


export default router;