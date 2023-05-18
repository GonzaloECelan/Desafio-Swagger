const {Router} = require('express');
const userRout = require('./user.routes')

const router = Router();

router.use('/user',userRout )

module.exports = router