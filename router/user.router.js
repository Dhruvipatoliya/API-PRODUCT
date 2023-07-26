const express = require('express')
const router = express.Router()
const upload = require('../cloud/multer')
const user_token = require('../midleware/user.midleware')
const {
    register,
    login,
    addProduct,
    showProduct,
    deleteProduct,
    updateProduct,
    filterProduct,
    filterPrice
} = require('../controller/user.controller')

router.post('/register',register)
router.post('/login',login)
router.post('/addProduct',user_token,upload.array('productimg'),addProduct)
router.get('/showProduct',user_token,showProduct)
router.delete('/deleteProduct/:id',user_token,deleteProduct)
router.put('/updateProduct/:id',user_token,upload.array('productimg'),updateProduct)
router.get('/filterProduct/:productname',user_token,filterProduct)
router.get('/filterPrice/:min/:max',user_token,filterPrice)

module.exports = router 