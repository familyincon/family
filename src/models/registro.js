const{Schema, model}=require('mongoose') 
const bcrypt = require('bcryptjs')


const registroSchema = new Schema({ 
    nombres: { 
        type: String,  
        require: true,  
        trim: true
    }, 
    apellidos:{ 
        type: String, 
        require: true, 
        trim: true
    }, 
    email: { 
        type: String, 
        require: true, 
        unique: true
    }, 
    contrasena: { 
        type: String, 
        require: true
    }, 
    activado: { 
        type:Boolean, 
        default: false
    }, 
    rol:[{  
        ref: "Role", 
        type: Schema.Types.ObjectId,
        /*type: String,*/ 
        default: "teens" 
    }]
},{ 
    timestamps:true, 
    versionKey: false
})  

registroSchema.statics.encryptPassword = async (password)=>{ 
  const salt =  await bcrypt.genSalt(10) 
  return await bcrypt.hash(password, salt) 
} 

registroSchema.statics.comparePassword = async (password, receivedPassword) =>{ 
  return await bcrypt.compare(password, receivedPassword)
}

module.exports= model('User', registroSchema);