const {Router} = require('express');
const {CartController} = require('../../controllers/cart.controller.js')

const router = Router();

router.post('/order',CartController.createTicket)
router.get('/:cid/purchase/:pid',CartController.quantity)
router.get('/:cid',CartController.getCartByiD)
router.post('/newCart',CartController.createCart)
router.post('/addProduct',CartController.addProduct)
router.delete('/delete/:cid',CartController.deleteCart)


module.exports = router;