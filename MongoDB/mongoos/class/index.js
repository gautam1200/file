console.log("hello");

const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.set('view engine', 'ejs')
mongoose.connect('mongodb://localhost:27017/offices')
    .then(() => {
        console.log("connect success");
    })
    .catch((error) => {
        console.log(error);
    })

let USER = require('./model/model')


app.get('/', async (req, res) => {
    const data = await USER.find()
    res.render('class', { data, editData: null })
})

app.get('/createData', async (req, res) => {
    const data = req.query

    if (data.id != "") {
        await USER.findByIdAndUpdate(data.id, data)
    }
    else {
        await USER.create(data)
    }

    res.redirect('/')
})

app.get('/deleteData/:id', async (req, res) => {
    const deleteId = req.params.id
    await USER.findByIdAndDelete(deleteId)
    res.redirect('/')
})

app.get('/updateData/:id', async (req, res) => {
    const editId = req.params.id

    const editData = await USER.findById(editId)
    const data = await USER.find()

    res.render('class', { editData, data })
})

app.listen(2323)
