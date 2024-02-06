const role = require('../models/role') 

const createRoles = async()=>{  
    try{
   const count = await role.estimatedDocumentCount() 

   if(count>0) return; 

   const values = await Promise.all([ 
    new role({name: 'teens'}).save(), 
    new role({name: 'admin'}).save(),  
    new role({name: 'psicologo'}).save()
   ])  
   console.log(values)
}catch(error){console.log(error)} 

} 

module.exports = {createRoles};