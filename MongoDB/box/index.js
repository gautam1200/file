console.log("hello");
const express = require('express');
const boxs = express()

boxs.set('view engine', 'ejs')

const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const client = new mongoClient('mongodb://localhost:27017/box')
client.connect()
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log(error)
    })

const database = client.db('box')
const collection = database.collection('sbox')



boxs.get('/', async (req, res) => {

    const data = await collection.find().toArray()
    res.render('box', { data, editData: null })
})

boxs.get('/createBox', async (req, res) => {
    const data = req.query

    if (data.id != "") {
        await collection.updateOne({ _id: new ObjectId(data.id) }, { $set: data })
    }
    else {

        await collection.insertOne(data)
    }
    res.redirect('/')
})


boxs.get('/deleteData/:id', async (req, res) => {
    const deleteId = req.params.id
    // console.log(deleteId);
    await collection.deleteOne({ _id: new ObjectId(deleteId) })
    res.redirect('/')
})


boxs.get('/updateData/:id', async (req, res) => {
    const editId = req.params.id

    const editData = await collection.findOne({ _id: new ObjectId(editId) })
    const data = await collection.find().toArray()

    res.render('box', { editData, data })
})

boxs.listen(4111)