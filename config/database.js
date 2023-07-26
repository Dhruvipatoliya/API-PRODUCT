const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect('mongodb+srv://dhruvipatoliya:Dhruvi612004@cluster0.fmm0ehu.mongodb.net/Api-Product')
db.once('open',(err)=>{
    if(err){
        console.log(err);
    }
    else {
        console.log('database is connected');
    }
})