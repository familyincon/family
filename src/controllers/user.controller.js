const User = require('../models/registro')  

const showUserInfo = async (req,res)=>{  
    const  idu = await User.findById(req.params.id).lean();
    res.render("editableuser", {idu})
  }; 

 const updateUser = async (req,res)=>{   
    //const id = req.params.id; 
    /*console.log(id) 
    console.log("body: ", req.body) 
   console.error = console.log*/
    await User.findByIdAndUpdate(req.params.id, req.body);
     
    res.redirect("/registro")
  };

 module.exports = {showUserInfo, updateUser};