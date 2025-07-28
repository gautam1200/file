console.log("hello");
const express = require('express')
const task = express();
const mongoose = require('mongoose');

task.set('view engine', 'ejs');

let USER = require('./model/model')

mongoose.connect('mongodb://localhost:27017/task')
.then(() => {
    console.log('Connected success')
})
.catch((error) => {
    console.log(error);
    
})

task.get('/' , (req , res ) => {
    res.render('login')
})


task.get('/crudData' , async(req ,  res) => {
    const data = req.query
    await USER.create(data)

    res.redirect('/')
})


task.get('/loginData' , async(req , res) => {
    const  { email , password } = req.query

    const gp = await USER.findOne({email , password})
    if(gp){
        console.log("welcome");
        res.render('well')
    }
    else{
        console.log("hello123");
        res.redirect('/')   
    }

})


task.listen(2222)