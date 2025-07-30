const express = require('express')
const router = express()
const mongoose = require('mongoose')
pass.set('view engine', 'ejs')
mongoose.connect('mongodb://localhost:27017/gs')
    .then(() => {
        console.log("connection succes");
    })
    .catch((error) => {
        console.log(error);
    })

const USER = require('../model/model')

router.get('/' , async(req , res) => {
    const data = await USER.find()
    res.render('index' ,{data})
})

router.get('/createData' , async(req , res) => {
    const data = req.query
    console.log(data);
    
    await USER.create(data)

    res.redirect('/')
})


module.exports = router
