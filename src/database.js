import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:SYsPLTF3cIPI16pS@cluster0.mh3vj.mongodb.net/recetasapp?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch(err => {
    console.log(err)
    console.log("Error al conectar a la base de datos");
});

