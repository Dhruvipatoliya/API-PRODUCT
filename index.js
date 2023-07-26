const express = require('express')
const pahth = require('path')
const port = process.env.key || 8000
const cookieparser = require('cookie-parser')
const cors = require('cors')
const app = express()

app.use(express.urlencoded())
require('./config/database')
app.use(cookieparser())
require('dotenv').config()
app.use(cors())

app.use('/user',require('./router/user.router'))
app.use('/admin',require('./router/admin.router'))


app.listen(port,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log('server is running on',port);
    }
})