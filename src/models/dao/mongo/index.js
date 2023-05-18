const { productDao} = require('../../dao/mongo/product.mongo.dao.js')
const {cartDao} = require('../../dao/mongo/cart.mongo.dao.js')
const {userDao} = require('../../dao/mongo/user.mongo.dao.js')
const {ticketDao} = require('../../dao/mongo/ticket.mongo.dao.js')



const productsDao = new productDao()
const cartsDao = new cartDao()
const usersDao = new userDao()
const ticketsDao = new ticketDao()

const getDAO = ()=>{
    return {
        
        productsDao,
        cartsDao,
        usersDao,
        ticketsDao

    }
}

module.exports =  {getDAO}