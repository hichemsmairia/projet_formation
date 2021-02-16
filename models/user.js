const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:String ,
    password:String
})

const User = mongoose.model('user',userSchema) // collection s'appelle users

module.exports = User