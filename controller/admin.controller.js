const express = require('express')
const adminschema = require('../model/admin.model')
const userschema = require('../model/user.model')
const productschema = require('../model/product.model')
const cloudinary = require('../cloud/cloudinary')
const adminjwt = require('jsonwebtoken')

//admin login data
exports.login = async(req,res)=>{
    try {
        console.log(req.body);
        const { adminemail, adminpassword } = req.body
        if (adminemail == '' || adminpassword == '') {
            res.json({ message: 'email or password not found' })
        } else {
            var checkdata = await adminschema.findOne({ adminemail })
            console.log(checkdata);
            if (checkdata == null) {
                res.json({ message: 'please register or enter valid email address' })
            } else {
                if (checkdata.adminpassword == adminpassword) {
                    var token = await adminjwt.sign({ id: checkdata._id }, process.env.key)
                    res.cookie('admin_jwt', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
                    console.log(token);

                    res.json({ message: 'user login successfully', token })
                } else {
                    res.json({ message: 'please enter valid password' })
                }
            }
        }
    } catch (error) {
        console.log(error,'catch error');
    }
}

//admin show all users
exports.showAlluser = async(req,res)=>{
    try {
        var data = await userschema.find({})
        res.json(data)
    } catch (error) {
        console.log(error,'catch error');
    }
}

//admin show all products
exports.showAllproduct = async(req,res)=>{
    try {
        var data = await productschema.find({})
        res.json(data)
    } catch (error) {
        console.log(error,'catch error');
    }
}