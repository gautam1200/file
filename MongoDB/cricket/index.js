console.log("hello");

const express = require('express')
const cricket = express()

cricket.set('view engine', 'ejs')

const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const client = new mongoClient('mongodb://localhost:27017/cricket')
client.connect()
    .then(() => {
        console.log("connection success");
    })
    .catch((error) => {
        console.log(error);

    })

const database = client.db('cricket')
const collection = database.collection('players')


cricket.get('/', async (req, res) => {
    const data = await collection.find().toArray()

    res.render('cricket', { data , editData: null })
})


cricket.get('/cricketData', async (req, res) => {
    const data = req.query
    console.log(data);

    if(data.id != ""){
       await collection.updateOne({_id: new ObjectId(data.id)} , {$set : data})
    }
    else{
        await collection.insertOne(data)
    }


    res.redirect('/')
})


cricket.get('/deleteData/:id' , async(req , res) => {
    const deleteId = req.params.id
    
   await collection.deleteOne({_id : new ObjectId(deleteId)})
   res.redirect('/')
})

cricket.get('/updateData/:id' ,async (req , res) => {
    const editId = req.params.id

    const editData = await collection.findOne({_id : new ObjectId(editId)})
    const data = await collection.find().toArray()

    res.render('cricket' , {editData , data})
})


cricket.listen(1000)

