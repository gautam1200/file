
const express = require('express');
const cal = express()

cal.set('view engine', 'ejs')

const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const client = new mongoClient('mongodb://localhost:27017/class')
client.connect()
    .then(() => {
        console.log("connection success");
    })
    .catch((error) => {
        console.log(error);
    })
    const database = client.db('class')
    const collection = database.collection('students')

cal.get('/', async (req, res) => {
    const data = await collection.find().toArray()
    res.render('class', { data, editData: null })
})



cal.get('/createclass', async (req, res) => {
    const data = req.query
    // console.log(data);

    if (data.id != "") {
        await collection.updateOne({ _id: new ObjectId(data.id) }, { $set: data })
    }
    else {
        await collection.insertOne(data)
    }
    res.redirect('/')
})

cal.get('/deleteData/:id', async (req, res) => {
    const deleteId = req.params.id

    await collection.deleteOne({ _id: new ObjectId(deleteId) })
    res.redirect('/')
})

cal.get('/updateData/:id', async (req, res) => {
    const editId = req.params.id

    const editData = await collection.findOne({ _id: new ObjectId(editId) })
    const data = await collection.find().toArray()
    res.render('class', { editData, data })
})



cal.listen(6636)