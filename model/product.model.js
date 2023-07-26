const mongoose = require('mongoose')
const productschema = new mongoose.Schema({
    productname:{
        type:String
    },
    productprice:{
        type:String
    },
    productdetail:{
        type:String
    },
    productimg:{
        type:Array
    },
    productimg_id:{
        type:Array
    },
    product_user_id:{
        type:String
    },
})
module.exports = mongoose.model('product',productschema)