const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Enter your name']
    },
    email : String,
    password : String
})

module.exports = mongoose.model('users' , userSchema)