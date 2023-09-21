 const mongoose = require('mongoose');
 var Schema=mongoose.Schema;
 const adminSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required : true
    }
 })
 module.exports=mongoose.model('AdminData',adminSchema)
