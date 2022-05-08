//Este router sirve para manejar login, registro, etc.

import express from "express";

import {createUsuario, Login} from "../controllers/usuariosController.js";


//Create the router
const router = express.Router();

router.post('/register',createUsuario)
router.post('/login',Login)

export default router;