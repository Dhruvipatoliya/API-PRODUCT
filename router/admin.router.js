const express = require('express')
const router = express.Router()
const upload = require('../cloud/multer')
const {
    showAlluser,
} = require('../controller/admin.controller')

router.get('/showAlluser',showAlluser)

module.exports = router