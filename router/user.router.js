const express = require('express')
const router = express.Router()
const upload = require('../cloud/multer')
const user_token = require('../midleware/user.midleware')
const {
    register,
    login,
    addProduct,
} = require('../controller/user.controller')

router.post('/register',register)
router.post('/login',login)
router.post('/addProduct',addProduct)

module.exports = router