const jwt = require('jsonwebtoken')
const userschema = require('../model/user.model')
const user_token = async(req,res,next)=>{
    var token = req.headers.authorization
    if(token){
        var userdata = await jwt.verify(token,process.env.key,(err,data)=>{
            if(err){
                console.log(err);
            } else {
                return data;
            }
        })
        if(userdata == undefined){
            res.json({message:'token invalid'})
        } else {
            console.log(userdata);
            var data = await userschema.findById(userdata.id)
            if(data == null){
                res.json({message:'data not found'})
            } else {
                next()
            }
        }
    } else {
        res.json({message:'login required'})
    }
}
module.exports = user_token