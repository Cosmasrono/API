const mongoose=require('mongoose')


const schema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    sname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    }

})
/* schema.methods={
    authenticate:function(plainPassword){
      return this.securePassword(plainPassword)===this.encry_password
    },
    securePassword:function(plainPassword){
      if(!plainPassword)return""
    },
  } */

module.exports=mongoose.model('user',schema)