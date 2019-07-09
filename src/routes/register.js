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
      .then(result => {
        console.log(result)
        res.send(result)
      })
      .catch(err => {
        console.log(err);
        res.send({
          error: err
        })
      })
  } catch (error) {
    res.send(error)
  }
})

router.get("/:id", (req, res, next) => {
  const id = req.params.id
  const result = playerService.find(id)
  res.send(result)
})



module.exports = router;