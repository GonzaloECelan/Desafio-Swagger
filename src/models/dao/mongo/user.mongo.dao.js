const {userModel} = require('../../schemas/user.model.js')


class userDao{

    getUsers = async()=>{
   
   const user = await userModel.find().lean()
   return user
   
       }
   
   getUserById = async(id)=>{
   const user = await userModel.findById(id).lean()
   return user
   }

   getUserByEmail = async(email)=>{
    const user = await userModel.findOne({email:email}).lean()
    return user
    }
   
   userRegister = async (payload) =>{
       const newUser = await userModel.create(payload)
       return newUser
   }
   
   updateUser = async (id,payload) =>{
       const updateUser = await userModel.findByIdAndUpdate(id,payload)
       return updateUser
   }

   loginUser = async (email)=>{
    const user = await userModel.findOne({email:email}).lean()
    return user
   }

   deleteUser = async(id)=>{
    const user = await userModel.findOneAndDelete({_id:id})
    return user
   }

   tokenUser = async (id,payload) =>{
    // const userToken = await userModel.findByIdAndUpdate(id,{$push:{token:tokenUser}})
    const userToken = await userModel.findByIdAndUpdate(id,payload)
    return userToken
   }
}
   
   
   module.exports = {userDao}