const {getDAO} = require('../models/dao/mongo/index.js')
const {hashPassword,validPassword,hashData} = require('../utils/hash.js')
const {ENV_CONFIG} = require('../config/env.config.js')
const {htpp_status, HttpError} = require('../utils/api.utils.js')
const {generateToken,resetPasswordToken,verifyToken} = require('../utils/utils.js')
const {userDTO} = require('../models/DTO/user.dto.js')
const nodemailer = require('nodemailer')

const {usersDao} = getDAO()


class userService {

    getUsers  = async()=>{

        const user = await usersDao.getUsers();
        return user
    }
    
    getUserById  = async(id)=>{
        if(!id){
            throw new HttpError('Missing param', htpp_status.BAD_REQUEST)  
        }
        const userId = await usersDao.getUserById(id)
        if(!userId){
            throw new HttpError('User not found', htpp_status.NOT_FOUND)  
        }
        return userId

    }
    userRegister  = async(payload)=>{
        const { firts_name, last_name, email, age , password} = payload;
        // if (!firts_name || !email || !last_name || !password) {
        // throw new HttpError('Missing fields', htpp_status.BAD_REQUEST);
        // }
        const user = await usersDao.getUserByEmail(email)
        if(user){
            console.log('este usuario ya existe')
        }

        const newUser = {
        firts_name,
        last_name,
        age,
        email,
        password:hashPassword(password)
    }
    const userDto = new userDTO(newUser)
    const userRegistered = await usersDao.userRegister(userDto)
    return userRegistered

    }

    loginUser = async (payload)=>{
        const {email, password} = payload
        const adminEmail = ENV_CONFIG.ADMIN_EMAIL;
        const adminPassword = ENV_CONFIG.ADMIN_PASSWORD
        if (!email || !password) {
            throw new HttpError('Missing fields', htpp_status.BAD_REQUEST);
            }
        const user = await usersDao.getUserByEmail(email)
        if(email === user.email && validPassword(user,password)){
            return user  
        }else{
            throw new HttpError('User not found', htpp_status.NOT_FOUND)   
        }
      
        }


    updateUser  = async(id, payload)=>{
        if (!id) {
            throw new HttpError('Missing param', htpp_status.BAD_REQUEST);
          }
          const { name, email } = payload;
          if (!name || !email) {
            throw new HttpError('Missing fields', htpp_status.BAD_REQUEST);
          }
          const updatePayload = {};
          payload.name && (updatePayload.name = payload.name);
          payload.email && (updatePayload.email = payload.email);
          const updatedUser = await usersDao.updateUser(id, updatePayload);
          return updatedUser;
    }

    deleteUser = async(id)=>{
        if (!id) {
            throw new HttpError('Missing param', htpp_status.BAD_REQUEST);
          }
        const user = await usersDao.deleteUser(id)
        return user

    }

    sendEmail = async (email) =>{
        if(!email){
            throw new HttpError('Missing fields', htpp_status.BAD_REQUEST)  
        }
        const user = await usersDao.getUserByEmail(email)
        const userEmail = user.email
        const userCode = user.code
        const userId = user._id

        const token = {
            email:userEmail,
            code:userCode
        }
        const generateTokenUser = resetPasswordToken(token)

        const userUpdate = {
            ...user,
            token:generateTokenUser

        }

        const tokenUserMB = await usersDao.tokenUser(userId,userUpdate)
    

        // const userHash = hashData(userCode)

        const config  = { 
            host: 'smtp-mail.outlook.com',
            port:587,
            auth:{
                user: 'gon_celan@hotmail.com',
                pass: 'mojonroto1234'
            }
        }

        const message = {
            from: 'gon_celan@hotmail.com',
            to: userEmail ,
            subject: 'Restrablecer contraseña',
            html:`<div> <h1> Hacé click en el siguiente link para cambiar tu contraseña:  </h1> 
            <span> http://localhost:8080/api/user/account/newPassword?token=${generateTokenUser} </span>
            </div> `,
            attachments: [] 
        }
        const transport = await nodemailer.createTransport(config)
        const sendEmailUser = await transport.sendMail(message)
        
        return sendEmailUser
    }

    resetPassword = async (email,password,password_repet)=>{
        if(!password || !email){
            throw new HttpError('Missing fields', htpp_status.BAD_REQUEST)  
        }

        if(password != password_repet){
            throw new HttpError('Debe ser la misma clave', htpp_status.BAD_REQUEST) 
        }
        const user = await usersDao.getUserByEmail(email)
        const tokenUser = user.token
        const userId = user._id

        const tokenVerify = verifyToken(tokenUser)

        if(!tokenVerify){
            throw new HttpError('token expirado', htpp_status.BAD_REQUEST) 
        }

        
        if(validPassword(user,password)){
            throw new HttpError('Missing fields', htpp_status.BAD_REQUEST)
        }
        const userUpdate = {
            ...user,
            password:hashPassword(password)
        }
      
        const result = await usersDao.updateUser(userId,userUpdate)

        return result

    }


    }


module.exports =  {userService}