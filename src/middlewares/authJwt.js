const jwt = require('jsonwebtoken') 
const config = require('../config')  

const User = require('../models/registro') 
const Rol = require('../models/role')

const verifyToken = async (req, res, next )=>{ 
try{ 
    const token = req.headers["x-access-token"]; 

console.log(token) 

if(!token) return res.status(403).json({message: "no token provided"})

const decoded = jwt.verify(token,config) 
req.userId = decoded.id 
//console.log(decoded) 

const user = await User.findById(req.userId, {contrasena:0}) 

if(!user) return res.status(404).json({message:'user not found'})

next()
} catch(error){ 
    return res.status(401).json({message: 'acceso denegado'})
}
} 

const isAdmin = async(req, res, next)=>{ 
 const user = await User.findById(req.userId)  
 //console.log(user)
 const roles = await Rol.find({_id:{$in: user.rol}})   

 for(let i=0;i<roles.length; i++){ 
    if(roles[i].name==="admin"){ 
        next()
    } 
    return
 }

 //console.log(roles) 
 return res.status(403).json({message:"requiere admin role"})
} 

const isTeens = async(req, res, next)=>{ 
    const user = await User.findById(req.userId)  
    //console.log(user)
    const roles = await Rol.find({_id:{$in: user.rol}})   
   
    for(let i=0;i<roles.length; i++){ 
       if(roles[i].name==="admin"){ 
           next()
       } 
       return
    }
   
    console.log(roles) 
    return res.status(403).json({message:"requiere teens role"})
}

module.exports = {verifyToken, isAdmin, isTeens}