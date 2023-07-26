const jwt = require('jsonwebtoken')
const adminschema = require('../model/admin.model')

const admin_token = async(req,res,next)=>{

    var token = req.headers.authorization
    if(token){
        var admindata = await jwt.verify(token,process.env.key,(err,data)=>{
            if(err){
                console.log(err);
            } else {
                return data;
            }
        })
        if(admindata == undefined){
            res.json({message:'token invalid'})
        } else {
            console.log(admindata);
            var data = await adminschema.findById(admindata.id)
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
module.exports = admin_token