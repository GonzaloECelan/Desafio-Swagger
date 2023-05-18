const {cartModel} = require('../../schemas/cart.model.js')


class cartDao {
    constructor(){

    }

    createCart = async (payload)=>{

        const newCart = await cartModel.create(payload)
        return newCart

    }

    deleteCart = async (CartId) =>{
        const deleteCart = await cartModel.findByIdAndDelete(CartId)
        return deleteCart
    }

    getCartById = async (cartId)=>{
        const cartByid = await cartModel.findOne({_id:cartId}).lean()
        return cartByid

    }

    addProduct = async(cartId,productId,quantity)=>{
        const addProduct = await cartModel.findOneAndUpdate({_id:cartId},{$push:{cart:{product:productId,quantity:quantity}}})
        return addProduct
    }

    updateProduct = async(cartId,productId, payload)=>{
        const updateProduct = await cartModel.findOneAndUpdate({_id:cartId},payload)
        return updateProduct
    } 



}

module.exports  = {
    cartDao
}