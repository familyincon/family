const ROLES = require('../models/role') 
const User = require('../models/registro')

const checkEmailDuplicate = async (req, res ,next) =>{ 
    const user = await User.findOne({email: req.body.email}); 

    if(user) return res.status(400).json({message:'the email already exist'}) 

    next()
}

const checkRolesExisted = async (req, res, next) =>{ 
    if(req.body.rol){ 
        for(let i=0; i<req.body.rol.length; i++){  
            const verifyRol = await ROLES.findOne({name: req.body.rol[i]})
           if(!verifyRol) return await res.status(400).json({message:`el rol ${req.body.rol[i]} no ha sido encontrado`})
          
        }
    } 
    next()
   
} 

module.exports={checkEmailDuplicate, checkRolesExisted}