console.log("hello");

const express = require('express')
const phone = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/monfoosecrud')
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log(error);

    })

let USER = require('./model/models')
phone.set('view engine', 'ejs')


phone.get('/', async (req, res) => {

    const data = await USER.find()

    res.render('crud', { data, editData: null })
})

phone.get('/createData', async (req, res) => {
    const data = req.query
    if (data.id != "") {
        await USER.findByIdAndUpdate(data.id, data)
    } else {
        await USER.create(data)
    }
    res.redirect('/')
})

phone.get('/deleteData/:id', async (req, res) => {
    const deleteId = req.params.id
    await USER.findByIdAndDelete(deleteId)
    res.redirect('/')
})

phone.get('/updateData/:id', async (req, res) => {
    const editId = req.params.id
    const editData = await USER.findById(editId)
    const data = await USER.find()

    res.render('crud', { editData, data })
})

phone.listen(1200)

