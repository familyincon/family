const express = require("express");
const router = express.Router(); 
const User = require('../models/registro')  


//importar arrchivos de la carpeta controllers
const {showUserInfo, updateUser}=require('../controllers/user.controller')
const{getAnsiedad, getAnsiedadById, registrarAnsiedad}=require('../controllers/ansiedad')

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/nosotros", (req, res) => {
  res.send("nosotros");
});

router.get("/contacto", (req, res) => {
  res.send("contacto");
});
//agrego async porque consultare datos en mongo
router.get("/registro", async (req, res) => { 
  const registerList = await User.find().lean() 
  //res.json(registerList)
  res.render("registro",{registerList});
}); 
///--actualizar el registro de usuario---///
router.get("/editableuser/:id", showUserInfo);

router.post("/editableuser/:id", updateUser);
//// ---end-----////

///-----eliminar usuario------/// 
router.get("/deleteuser/:id", async (req,res)=>{ 
  const id = req.params.id; 
  await User.findByIdAndDelete(id);  
  
  res.redirect("/registro");
})
///final eliminar usuario// 

//activar usuario/// 
router.get("/booluser/:id", async (req,res)=>{ 
const id= req.params.id;  
const estado=await User.findById(id)   
console.log(estado.activado)
 estado.activado = true
 await estado.save();
res.redirect("/")
})
////final de activar estado usuario//  

//ansiedad ruta// 
router.get('/ansiedad', getAnsiedad) 

//contactanos// 
router.get("/contactanos",(req, res)=>{ 
  res.render('contactanos')
})

//login//
router.get("/login",(req,res)=>{  
    res.render('login')
})

router.get("/home",(req,res)=>{  
    const v = "prueba";
    res.render('home',{v})
})

router.get("/procesos", (req,res)=>{res.render("procesos")}) 
//metodo post  
router.post('/Users/add', async (req,res)=>{   
  try{ 
    const {nombres,apellidos,email} = req.body 
    const newUser = new User({nombres,apellidos,email}) 
    const userSave =await newUser.save() 
    res.status(201).json(userSave)
    //------//
    /*const usuario = User(req.body) 

    await usuario.save()*/

    res.redirect("/") 
  }catch(error){ 
    console.log(error)
  }
})

module.exports = router;
