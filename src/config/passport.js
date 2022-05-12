import passport  from 'passport';
import LocalStrategy  from'passport-local';
import path  from 'path'; //Para usar las rutas de archivos
import User  from'../models/Usuario.js';

//Registro de usuarios
passport.use('local-signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contrasena',
    passReqToCallback: true
    }, async (req, correo, contrasena, done) => {
        const { nombre,imagen,bio } = req.body;
        const user = await User.findOne({ correo });
        if (user) {
            return done(null, false, req.flash('error_msg', 'El correo ya está registrado'));
        } else {
            //obtener el nombre del archivo
            const name = req.file.originalname.split('.');
            console.log(req.file);
            const newUser = new User();
            newUser.nombre = nombre;
            newUser.correo = correo;
            newUser.contrasena = newUser.encryptPassword(contrasena);
            newUser.imagen = 'src/public/uploads/' + name[0] + '-' + path.extname(req.file.originalname)
            newUser.rol = 'usuario';
            newUser.estado = true;
            newUser.bio = bio;
            await newUser.save();
            done(null, newUser);
        }
    }
));


//Inicio de sesión
passport.use('local-signin',new LocalStrategy.Strategy({
    usernameField: 'correo',
    passwordField: 'contrasena',
    passReqToCallback: true
},async(req,correo, contrasena, done) => {
    const user = await User.findOne({correo});
    if(!user) {
        return done(null, false, req.flash('error_msg', 'No existe el usuario'));
    } else {
       const match = await user.comparePassword(contrasena);
       if(match) {
           return done(null, user);
       } else {
           return done(null, false, req.flash('error_msg', 'Contraseña incorrecta'));
       }
    }
}));

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser( async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});