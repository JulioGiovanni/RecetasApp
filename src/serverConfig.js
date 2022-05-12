//Importaciones
import express from'express'; //Express framework
import expressLayouts  from'express-ejs-layouts'; //Para usar EJS
import path  from 'path'; //Para usar las rutas de archivos
import {fileURLToPath} from 'url';
import morgan from 'morgan'; //Para ver las peticiones
import flash  from'connect-flash'; //Mensajes flash
import session  from'express-session'; //Sesiones
import passport  from'passport'; //Autenticación
import MongoStore  from 'connect-mongo'; //Almacenamiento de sesiones
import router from'./routes/index.routes.js'; //Importamos las rutas
import userRouter from'./routes/usuarios.routes.js'; //Importamos las rutas
import recetasRouter from'./routes/recetas.routes.js'; //Importamos las rutas


const __filename = fileURLToPath(import.meta.url); //Para obtener el nombre del archivo

const __dirname = path.dirname(__filename); //Para obtener el directorio del archivo

import './database.js';
import './config/passport.js';

//Instancia del servidor
const app = express(); //Esto inicia el servidor y lo iguala a la variable app

//Configuraciones
app.use(morgan('dev')); //Para ver las peticiones que se hacen
app.set('port', process.env.PORT || 3000); //Puerto, si existe uno en el entorno de desarrollo, si no, 3000
app.use(express.urlencoded({extended: true})); //Para que se puedan enviar datos por formularios
app.use(express.static('public')); //Para que se puedan usar archivos estaticos
app.use('public', express.static(path.join(__dirname, 'public'))); //Para que se puedan usar archivos estaticos
app.use(expressLayouts); //Para que se puedan usar layouts

app.set('view engine', '.ejs'); //Para que se puedan usar EJS
app.set('views', path.join(__dirname, 'views/pages')); //Para que se puedan usar las vistas y node sepa donde están
app.set('layout', '../layouts/main'); //En dónde estarán nuestra plantilla principal


// Middlewares
app.use(express.urlencoded({extended: false}));

// app.use(method0verride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb+srv://admin:SYsPLTF3cIPI16pS@cluster0.mh3vj.mongodb.net/recetasapp?retryWrites=true&w=majority"}), 
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("."));
app.use(express.json());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next();
});

app.use('/', router); //Para que se puedan usar las rutas
app.use('/', userRouter); //Para que se puedan usar las rutas
app.use('/recetas', recetasRouter); //Para que se puedan usar las rutas

export default app; //Exportamos la variable app para usarla en nuestro server.js