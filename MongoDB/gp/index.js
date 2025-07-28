console.log("hello");
const express = require('express')
const off = express()

off.set('view engine', 'ejs')

const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId
const client = new mongoClient('mongodb://localhost:27017/gautam')
client.connect()
    .then(() => {
        console.log('connected')
    })
    .catch(err => {
        console.log(err)
    })

const database = client.db('gautam')
const collection = database.collection('office')

off.get('/', async (req, res) => {

    const data = await collection.find().toArray()
    res.render('pg',{data , editData:null})
})

off.get('/creategp', async (req, res) => {
    const data = req.query
    if(data.id != '')
        {
        await collection.updateOne({_id : new ObjectID(data.id)} , {$set : data})
    }
    else{
        await collection.insertOne(data)
    }
    res.redirect('/')
})

off.get('/deleteData/:id' ,async (req , res) => {
    const deleteId = req.params.id
   await collection.deleteOne({ _id: new ObjectID(deleteId) })

   res.redirect('/')
})


off.get('/updateData/:id' ,async (req , res) => {
    const editId = req.params.id 
     const editData =  await collection.findOne({ _id: new ObjectID(editId) })
    const data = await collection.find().toArray()
    res.render('pg' ,{editData , data} )
})

off.listen(8888)