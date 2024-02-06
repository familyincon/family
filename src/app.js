// configura app 
const express = require("express");
const path = require("path");
const Morgan = require('morgan'); 
const {createRoles} = require('./libs/initialSetup')  


const app = express();

createRoles();
const HomeRoute = require('./routes/home') 
const authRoutes = require('./routes/auth.routes')
//settings
app.set('case sensitive routing', true) 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))  
//app.set('images', path.join(__dirname, 'images')) 

//middleware  
app.use(express.json())
app.use(Morgan('dev')) 
app.use(express.urlencoded({extended: false})) 
app.use('/photos',express.static(path.join(__dirname,'images'))) 
app.use('/estilos',express.static(path.join(__dirname,'estilos')))
//rutas 
app.use(HomeRoute)  
app.use(authRoutes)
app.get('*',(req,res)=>{res.end("ruta no encontrada")})

module.exports=app