console.log("hello");
const express = require('express')
const pass = express()
const mongoose = require('mongoose')

pass.set('view engine', 'ejs')
let USER = require('./model/model')
mongoose.connect('mongodb://localhost:27017/gs')
    .then(() => {
        console.log("connection succes");
    })
    .catch((error) => {
        console.log(error);
    })



pass.get('/', async (req, res) => {
    const data = await USER.find()
    res.render('gs', { data, editData: null })
})

pass.get('/createData', async (req, res) => {
    const data = req.query
    if (data.id != "") {
        await USER.findByIdAndUpdate(data.id, data)
    }
    else {
        await USER.create(data)
    }
    res.redirect('/')
})

pass.get('/deleteData/:id', async (req, res) => {
    const deleteId = req.params.id

    await USER.findByIdAndDelete(deleteId)
    res.redirect('/')
})

pass.get('/updateData/:id', async (req, res) => {
    const editId = req.params.id

    const editData = await USER.findById(editId)
    const data = await USER.find()

    res.render('gs', { editData, data })
})



pass.listen(3000)