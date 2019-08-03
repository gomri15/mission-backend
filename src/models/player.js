const mongoose = require('mongoose');
// please use const
const playerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  password: String,
  age: Number,
  role: String,
});

module.exports = mongoose.model('Player', playerSchema);


// eslint airbnb
// Please fix all the comments that we gave your today
