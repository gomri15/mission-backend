const express = require("express");
const playerService = require('./../services/playerService')

let PlayerModel = require('./../models/player')
var mongoose = require('mongoose');

const router = express.Router();

router.post("/", function (req, res, next) {
  let newPlayer = new PlayerModel({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    password: req.body.password,
    age: req.body.age,
    role: req.body.role
  })
  try {
    playerService.save(newPlayer)
    res.send(newPlayer)
  } catch (err) {
    res.send({
      error: err
    })
  }
})

router.get("/:id", (req, res, next) => {
  const query = {
    "_id": req.params.id
  }
  const result = playerService.find(query)
  res.send()
})



module.exports = router;