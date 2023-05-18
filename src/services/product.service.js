const { productDao} = require('../models/dao/mongo/product.mongo.dao.js')
const {getDAO} = require('../models/dao/mongo/index.js')
const {htpp_status, HttpError} = require('../utils/api.utils.js')


const {productsDao} = getDAO()

class productService {

getProducts = async() =>{
    const products = await productsDao.getAll()
    return products
}

getProductById = async(id)=>{

if(!id){
    throw new HttpError('Missing param', htpp_status.BAD_REQUEST) 
}
const product = await productsDao.getById(id)
return product
}


createNewProduct = async(payload)=>{
const {title, description, price, code, stock , category} = payload

if(!title || !description || !price || !code || !stock || !category){
    throw new HttpError('Missing fields', htpp_status.BAD_REQUEST);
}
const newProduct =  {
    title,
    description,
    price,
    stock,
    code,
    category
}
const response = await productsDao.createProduct(newProduct)
return response
}

updateProduct = async(id, payload)=>{
if(!id || !payload){
    throw new HttpError('Missing param', htpp_status.BAD_REQUEST) 
}
const productId = await productsDao.getById(id);

if(!productId){
    throw new HttpError('Product not found', htpp_status.BAD_REQUEST)
}

const product = {
    ...payload
}
const response = await productsDao.updateProduct(id, product)
return response
}

deleteProduct = async(id)=>{
    if(!id){
        throw new HttpError('Missing param', htpp_status.BAD_REQUEST) 
    }
    const productId = await productsDao.getById(id);

    if(!productId){
    throw new HttpError('Product not found', htpp_status.BAD_REQUEST)
    }
const response = await productsDao.deleteProduct(id)
return response

}
}



module.exports = {productService}