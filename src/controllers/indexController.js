//Página principal
export const indexController = {

     HomePage: (req,res) =>{
        res.render('home');
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
    Profile: (req,res) => {
        res.render('usuarios/perfil');
    }

}


