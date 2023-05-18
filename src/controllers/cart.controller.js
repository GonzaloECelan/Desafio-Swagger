const {cartModel} = require('../models/schemas/cart.model.js')
const {cartService} = require('../services/cart.service.js')
const {ticketService} = require('../services/ticket.service.js')
const {htpp_status, HttpError} = require('../utils/api.utils.js')


const cartServices = new cartService()
const ticketServices = new ticketService()


class CartController {

    static quantity = async(req,res,next)=>{
        const cartId = req.params.cid
        const productId = req.params.pid
        try {
            const response = await cartServices.buyCart(cartId,productId)
            res.status(htpp_status.OK).send({payload:response})   
        } catch (error) {
            next(error)
        }
    }


static createCart = async (req,res,next)=>{
    const username = req.body
    try {
        const response = await cartServices.createCart(username)
       
     
        res.status(htpp_status.CREATED).send({payload:response})
        
    } catch (error) {
        next(error)
    }
}

    static getCartByiD = async (req,res,next)=>{
        const cartId = req.params.cid
try {
    const response = await cartServices.getCartById(cartId)
    res.status(htpp_status.OK).send({payload:response})
    
} catch (error) {
    next(error)
}
    }

static addProduct = async ( req,res,next)=>{
   const {cartId,productId,quantity} = req.body
    try {

    const response = await cartServices.addProductCart(cartId,productId,quantity)
    res.status(htpp_status.OK).send({payload:response})
        

    } catch (error) {
        next(error)
    }
}

static deleteCart = async (req,res,next)=>{
    const cartId = req.params.cid
    try {

        const response = await cartServices.deleteCart(cartId)
        res.status(htpp_status.OK).send({payload:response})
             
        
    } catch (error) {
        next(error) 
    }
}

static createTicket = async ( req,res,next)=>{
    const payload = req.body
    try {
        const response = await ticketServices.createTicket(payload)
        res.status(htpp_status.OK).send({payload:response})

    } catch (error) {
        next(error)
    }
}

}



module.exports = {CartController}