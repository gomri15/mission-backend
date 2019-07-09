const connection = require('../services/mongodb')
const mongoose = require('mongoose')

let playerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String,
    age: Number,
    role: String
})

module.exports = mongoose.model('Player', playerSchema)