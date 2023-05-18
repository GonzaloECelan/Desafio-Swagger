const {Router} = require('express');
const {UserControllers} = require('../../controllers/user.controllers')
const {Render} = require('../../controllers/render.controller.js')

const router = Router();


router.post('/account/newPassword',UserControllers.newPassword)
router.post('/account/reset', UserControllers.EmailResetPassword)
router.get('/getUser/:id',UserControllers.getUserById)
router.get('/getUsers',UserControllers.getUsers)
router.post('/login',UserControllers.loginUser)
router.post('/register',UserControllers.registerUser)
router.delete('/deleteUser/:id',UserControllers.deleteUser)

// rutas front
router.get('/account/newPassword',Render.newPassword)
router.get('/account/reset',Render.resetPassword)
router.get('/login',Render.loginRender)
router.get('/register',Render.registerRender)

module.exports = router