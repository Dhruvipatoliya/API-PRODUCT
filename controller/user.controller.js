const express = require('express')
const userschema = require('../model/user.model')
const cloudinary = require('../cloud/cloudinary')
const userjwt = require('jsonwebtoken')

//user register post method
exports.register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, useremail, userpassword } = req.body
        if (username == '' || useremail == '' || userpassword == '') {
            res.json({ message: 'name, email or password not found' })
        } else {
            var checkdata = await userschema.findOne({ useremail })
            if (checkdata == null) {
                var data = await userschema.create({ username, useremail, userpassword })
                if (data) {
                    res.json({ message: 'user registered successfully' })
                } else {
                    res.json({ message: 'user registered not successfully' })
                }
            } else {
                res.json({ message: 'email alrady exits' })
            }
        }
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//user login post method
exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { useremail, userpassword } = req.body
        if (useremail == '' || userpassword == '') {
            res.json({ message: 'email or password not found' })
        } else {
            var checkdata = await userschema.findOne({ useremail })
            if (checkdata == null) {
                res.json({ message: 'please register or enter valid email address' })
            } else {
                if (checkdata.userpassword == userpassword) {
                    var token = await userjwt.sign({ id: checkdata._id }, process.env.key)
                    res.cookie('user_jwt', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })

                    res.json({ message: 'user login successfully',token })
                } else {
                    res.json({ message: 'please enter valid password' })
                }
            }
        }
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//user add product post method
exports.addProduct = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error,'catch error');
    }
}
