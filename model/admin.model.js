const mongoose = require('mongoose')
const adminschema = new mongoose.Schema({
    adminemail:{
        type:String
    },
    adminpassword:{
        type:String
    },
})
module.exports = mongoose.model('admin',adminschema)