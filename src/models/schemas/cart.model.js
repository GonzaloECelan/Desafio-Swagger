const mongoose = require('mongoose');
const {productCollection} = require('./product.model.js');

const collection = 'carts';

const cartSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    
    },
    cart:{
      type:[{
        product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:productCollection
        },
        quantity:{type:Number}
        
      }],
      default:[]

    }
})

cartSchema.pre('findOne',function(next){
    this.populate('cart.product')
    next()
})

const cartModel = mongoose.model(collection,cartSchema);

module.exports = {cartModel};


