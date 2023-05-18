const jwt = require('jsonwebtoken');
const {ENV_CONFIG} = require('../config/env.config');
const {userService} = require('../services/user.service.js')
const {htpp_status, HttpError} = require('../utils/api.utils.js')
const {generateToken,resetPasswordToken,verifyToken} = require('../utils/utils.js')

const userServices = new userService()



class UserControllers {

  static getUsers = async (req,res,next) =>{
    try {
      const response = await userServices.getUsers()
      res.status(htpp_status.OK).json({payload:response})
    } catch (error) {
      next(error)
    }
  }
    
  static getUserById = async (req,res,next)=>{
    const userId = req.params.id
    try {
      const response = await userServices.getUserById(userId)
      res.status(htpp_status.OK).json({payload:response})

    } catch (error) {
      next(error)
    }
  }

   


    static registerUser = async(req,res,next)=>{
      const payload = req.body;
      try {
 
    const response = await userServices.userRegister(payload)
    res.redirect('/api/user/login')
    //  res.status(htpp_status.CREATED).send({message:response})


      } catch (error) {
        next(error)
      }
    }

static loginUser = async (req,res,next)=>{
    const payload = req.body
    try {
      const response = await userServices.loginUser(payload)
      const token = generateToken(payload)
      res.cookie('user_login',token,{
        maxAge:60*60,
        httpOnly:true,
        signed:true
      })
res.render('productos')
      // res.status(htpp_status.OK).send({message:response})
    } catch (error) {
      next(error)
    }
}

static deleteUser = async (req,res,next)=>{
  const userId = req.params.id
  try {
    const response = await userServices.deleteUser(userId)
      res.status(htpp_status.OK).send({messages:response})
  } catch (error) {
    next(error)
  }
}

static EmailResetPassword = async (req,res,next)=>{
  const {email} = req.body
  try {

    const response = await userServices.sendEmail(email)
    res.status(htpp_status.OK).send({messages:'send email ok'})

  } catch (error) {
    next(error)
  }
}

static newPassword = async (req,res,next) =>{
  const code = req.query.token
  const {email,password,password_repet} = req.body
  try {

      const response = await userServices.resetPassword(email,password,password_repet)
      console.log('el token es',code)
      res.redirect('http://localhost:8080/api/user/login')

  } catch (error) {
    next(error)
  }
}

static current = async (req,res,next)=>{
  try {
    
  } catch (error) {
    next(error)
  }
}


}

module.exports = {UserControllers}