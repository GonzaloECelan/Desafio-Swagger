const {productModel} = require('../models/schemas/product.model')
const {productService} = require('../services/product.service.js')
const {htpp_status, HttpError} = require('../utils/api.utils.js')

const productsService = new productService();



class ProductControllers {
    
static getAll = async (req, res, next)=>{
    
    try {

        const response =  await productsService.getProducts()
        res.status(htpp_status.OK).send({payload:response})

 
    } catch (error) {
        next(error)
    }
}

static getById = async (req, res, next) =>{
    const productId = req.params.id;
    try {
        const response= await productsService.getProductById(productId)
        res.status(htpp_status.OK).send({payload:response})
    } catch (error) {
        next(error)
    }
}

static createProducts = async (req,res,next)=>{
    const payload = req.body
    try {
        const response = await productsService.createNewProduct(payload)
        res.status(htpp_status.CREATED).send({payload:response})
    } catch (error) {
        next(error)
    }
}

static upDateProduct = async (req,res,next) =>{
    const productId = req.params.id;
    const payload = req.body;
    try {
        const response = await productsService.updateProduct(productId,payload );
        res.status(htpp_status.OK).send({Productupdate: response})
    } catch (error) {
        next(error)
    }
}

static deleteProduct = async (req,res,next)=>{
    const productId = req.params.id;
    try {
        const response = await productsService.deleteProduct(productId);
        res.status(htpp_status.OK).send({productDelete: response})
    } catch (error) {
        next(error)
    }
}

}

module.exports = {
    ProductControllers
}