const {Router} = require('express');
const {ProductControllers} = require('../../controllers/product.controllers')

const router = Router();



router.get('/home',ProductControllers.getAll);
router.get('/:id',ProductControllers.getById);
router.post('/add',ProductControllers.createProducts);
router.put('/:id',ProductControllers.upDateProduct);
router.delete('/delete/:id',ProductControllers.deleteProduct);

module.exports = router;