const express = require('express')
const userschema = require('../model/user.model')
const productschema = require('../model/product.model')
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
                    console.log(token);

                    res.json({ message: 'user login successfully', token })
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
exports.addProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { productname, productprice, productimg, productdetail } = req.body

        var decode = await userjwt.verify(req.headers.authorization, process.env.key)
        console.log(decode);

        if (productname == '' || productimg == '' || productprice == '' || productdetail == '') {
            res.json({ message: 'some field is missing' })
        } else {
            var files = req.files
            var product_img = []
            var productimg_id = []
            for (var file of files) {
                var imgdata = await cloudinary.uploader.upload(file.path)
                product_img.push(imgdata.secure_url)
                productimg_id.push(imgdata.public_id)
            }

            var data = await productschema.create({
                productname,
                productdetail,
                productprice,
                product_img,
                productimg_id,
                product_user_id: decode.id
            })
            if (data) {
                res.json({ message: 'product data added successfully' })
            } else {
                res.json({ message: 'product data not added successfully' })
            }
        }
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//user show all product get method
exports.showProduct = async (req, res) => {
    try {
        var data = await productschema.find({})
        res.json(data);
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//user delete product data
exports.deleteProduct = async (req, res) => {
    try {
        var data = await productschema.findById(req.params.id)
        for (var i = 0; i < data.productimg_id.length; i++) {
            cloudinary.uploader.destroy(data.productimg_id[i], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            })
        }

        var deletedata = await productschema.findByIdAndDelete(req.params.id)
        if (deletedata) {
            res.json({ message: 'product data deleted successfully' })
        } else {
            res.json({ message: 'product data not deleted successfully' })
        }
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//user update product data
exports.updateProduct = async (req, res) => {
    try {
        if (req.files) {
            var data = await productschema.findById(req.params.id)
            for (var i = 0; i < data.productimg_id.length; i++) {
                cloudinary.uploader.destroy(data.productimg_id[i], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                })
            }

            var files = req.files
            var product_img = []
            var productimg_id = []
            for (var file of files) {
                var imgdata = await cloudinary.uploader.upload(file.path)
                product_img.push(imgdata.secure_url)
                productimg_id.push(imgdata.public_id)
            }
            req.body.productimg = product_img
            req.body.productimg_id = productimg_id
            var update = await productschema.findByIdAndUpdate(req.params.id, req.body)
            if (update) {
                res.json({ message: 'product data updated successfully' })
            } else {
                res.json({ message: 'product data not updated successfully' })
            }
        } else {
            var update = await productschema.findByIdAndUpdate(req.params.id, req.body)
            if (update) {
                res.json({ message: 'product data updated successfully' })
            } else {
                res.json({ message: 'product data not updated successfully' })
            }
        }
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//user filter product 
exports.filterProduct = async (req, res) => {
    try {
        console.log(req.params);
        var data = await productschema.find({ productname: req.params.productname})
        res.json(data)
    } catch (error) {
        console.log(error, 'catch error');
    }
}

//user filter price
exports.filterPrice = async(req,res)=>{
    try {
        var data = await productschema.find({productprice: { $gte: req.params.min, $lte: req.params.max }})
        res.json({data})
    } catch (error) {
        console.log(error,'catch error');
    }
}
