const express = require('express')
const router = express.Router()
const upload = require('../cloud/multer')
const admin_token = require('../midleware/admin.midleware')
const {
    login,
    showAlluser,
    showAllproduct,
} = require('../controller/admin.controller')

router.post('/login',login)
router.get('/showAlluser',showAlluser)
router.get('/showAllproduct',showAllproduct)

module.exports = router