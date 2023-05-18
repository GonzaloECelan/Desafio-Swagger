const {Router} = require('express');
const cartRout = require('../../routes/cart/cart.routes.js')

const router = Router();

router.use('/cart',cartRout)

module.exports = router