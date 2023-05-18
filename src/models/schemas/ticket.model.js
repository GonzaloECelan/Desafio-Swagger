const mongoose = require('mongoose');

const collection = 'orders';

const schema = new mongoose.Schema({
    code:{type:String, unique:true},
    purchase_datetime:{type:String},
    amount:{type:Number},
    email:{type:String, unique:true},

})


const ticketModel = mongoose.model(collection,schema);

module.exports = {ticketModel};