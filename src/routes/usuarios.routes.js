//Este router sirve para manejar login, registro, etc.
import express from "express";
import {createUsuario, Login, Logout} from "../controllers/usuariosController.js";
import { alreadyAuthenticated, isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../utils/multer.js";

//Create the router
const router = express.Router();

router.post('/register',[alreadyAuthenticated,upload.single('imagen')],createUsuario)
router.post('/login',alreadyAuthenticated,Login)
router.get('/logout',isAuthenticated,Logout)


export default router;