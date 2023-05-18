const {getDAO} = require('../models/dao/mongo/index.js')
const { productModel } = require('../models/schemas/product.model.js')
const {htpp_status, HttpError} = require('../utils/api.utils.js')


const {cartsDao} = getDAO()

class cartService {
    constructor(){


    }

    getCartById = async (cartId) =>{
        const cart = await cartsDao.getCartById(cartId)
        return cart
    }

    createCart = async(username)=>{
    const data = username
    if(!username){
        throw new HttpError('Missing param', htpp_status.BAD_REQUEST)
    }
    const cart = await cartsDao.createCart(data)
    return cart
}

addProductCart = async(cartId,productId,quantity)=>{
    if(!cartId || !productId){
        throw new HttpError('Missing param', htpp_status.BAD_REQUEST)
    }
    const getCart = await cartsDao.getCartById(cartId);
    if(!getCart){
        throw new HttpError('Cart not found', htpp_status.NOT_FOUND)
    }
    const findProduct = await getCart.cart.find(element=>element.product._id == productId)
    if(findProduct){
        const findIndex = getCart.cart.findIndex((element)=>element.product._id == productId);
        
        const payload= {
            product:productId,
            quantity:quantity
        }
        getCart.cart.splice(findIndex,1,payload)
        const response = await cartsDao.updateProduct(cartId,getCart)
    }
   
    const response = await cartsDao.addProduct(cartId,productId,quantity)
   
    return response 
  
   

}

deleteCart = async ( cartId)=>{
    if(!cartId){
        throw new HttpError('Missing param', htpp_status.BAD_REQUEST)
    }
    const response = await cartsDao.deleteCart(cartId);
    return response

}


buyCart = async (cartId, productId)=> {
    const cart = await cartsDao.getCartById(cartId)
    if(!cart){
        throw new HttpError('Cart not found', htpp_status.NOT_FOUND)
    }
    const product = productId;
    const carts = cart.cart.find(e=>e == e.quantity)
    const stock = 100

    const findProduct = await productModel.findById(product)
    if(stock > findProduct.stock){
        console.log('Stock insuficiente')
    }
    

   return findProduct


}



}





module.exports = {cartService}