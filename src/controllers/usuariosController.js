import  Usuario  from '../models/Usuario.js';
import passport from 'passport';

    //Método para obtener todos los usuarios
    export const getUsuarios = async (req, res) => {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    }
    //Método para crear un usuario
    export const createUsuario = async (req, res) => {
        const { nombre, correo, contrasena } = req.body;
        
        try {
            const usuario = new Usuario({
                nombre,
                correo,
                contrasena
            });
            await usuario.save();
            res.json({
                status: 'Usuario guardado'
            });    
        } catch (error) {
            console.log(error)
            res.json({
                status: 'Error al guardar el usuario'
            });
        }
        
    }
    //Método para obtener un usuario
    export const getUsuario = async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        res.json(usuario);
    }
    //Método para actualizar un usuario
    export const updateUsuario = async (req, res) => {
        const { id } = req.params;
        const { nombre, correo, contrasena } = req.body;
        await Usuario.findByIdAndUpdate(id, {
            nombre,
            correo,
            contrasena
        }, {
            new: true
        });
        res.json({
            status: 'Usuario actualizado'
        });
    }
    //Método para eliminar un usuario
    export const deleteUsuario = async (req, res) => {
        const { id } = req.params;
        await Usuario.findByIdAndRemove(id);
        res.json({
            status: 'Usuario eliminado'
        });
    }
    //Método para iniciar sesión
    export const Login = async (req, res) => {
        const { correo, contrasena } = req.body;
        const usuario = await Usuario.findOne({ correo, contrasena });
        if (usuario) {
            
        } else {
            res.json({
                status: 'Usuario no encontrado'
            });
        }
    }
  

    //Método para cerrar sesión
    export const Logout = (req, res) => {
        req.logout();
        return res.redirect('/');
    }




