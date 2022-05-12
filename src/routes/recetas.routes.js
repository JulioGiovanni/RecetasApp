

import express from "express";

import {recetasController as RC} from "../controllers/recetasController.js";
import { categoriaController as CC } from "../controllers/categoriaController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../utils/multer.js";


//Create the router
const router = express.Router();

router.get('/:categoria',RC.getRecetasByCategoria);
router.get('/detalle/:id',RC.getReceta);
router.post('/newcategory',[isAdmin,upload.single('imagen')],CC.createCategoria);
router.post('/newrecipe',[isAuthenticated,upload.single('imagen')],RC.createReceta);


export default router;