const mongoose = require('mongoose');


const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name:{type:String },
    last_name:{type:String },
    email:{type:String, unique:true},
    age:{type:Number},
    password:{type:String},
    code:{type:String,unique:true},
    token:{type:String},
    rol:{type:String, enum:['USER','ADMIN'], default:'USER'},
})


const userModel = mongoose.model(userCollection,userSchema);

module.exports = {userModel};