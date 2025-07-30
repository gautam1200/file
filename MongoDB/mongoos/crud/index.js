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
let UC = require('./controller/red')

phone.get('/', UC.viewsPage )

phone.get('/createData', UC.Datashow)

phone.get('/deleteData/:id', UC.Datadelete)

phone.get('/updateData/:id', UC.UpdateData)

phone.listen(1200)

