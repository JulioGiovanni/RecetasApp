import passport  from 'passport';
import LocalStrategy  from'passport-local';
import User  from'../models/Usuario.js';

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password'
},async(email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
        return done(null, false, {message: 'No se encontró registro'});
    } else {
       const match = await user.matchPassword(password);
       if(match) {
           return done(null, user);
       } else {
           return done(null, false, {message: 'Contraseña incorrecta'});
       }
    }
}));

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err,user);
    });
});