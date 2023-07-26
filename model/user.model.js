const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    username:{
        type:String
    },
    useremail:{
        type:String
    },
    userpassword:{
        type:String
    },
    userimg:{
        type:String
    },
    userimg_id:{
        type:String
    },
})
module.exports = mongoose.model('user',userschema)