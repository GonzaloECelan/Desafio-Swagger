const mongoose = require('mongoose');
const {ENV_CONFIG} = require('../config/env.config')

const url = ENV_CONFIG.MONGO_URI;


mongoose.set('strictQuery', false);

mongoose.connect(url,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Connected to MD successfully')
    }
})