const {Router} = require('express');
const productRout = require('../../routes/products/product.routes')

const router = Router();

router.use('/product',productRout )

module.exports = router