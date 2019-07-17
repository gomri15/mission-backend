const express = require("express");
const playerService = require('../services/playerService')

let PlayerModel = require('../models/player')
let mongoose = require('mongoose');
let ObjectId = require('mongoose').Types.ObjectId;


const router = express.Router();

router.post("/", function (req, res, next) {
  let newPlayer = new PlayerModel({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    password: req.body.password,
    age: req.body.age,
    role: req.body.role
  })

  playerService.save(newPlayer)
    .then(result => {
      console.log(result)
      res.status(201).json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        error: err
      })
    })
})

router.get("/", (req, res, next) => {
  playerService.find()
    .then(result => {
      res.status(200).json({
        players: result
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get("/:id", (req, res, next) => {
  const id = req.params.id
  if (ObjectId.isValid(id)) {
    playerService.find(id)
      .then(result => {
        if (!result) {
          res.status(404).json({
            message: "That player doesn't exist"
          })
        } else {
          res.status(200).json(result)
        }
      })
      .catch(err => console.log(err))
  } else {
    res.status(400).json({
      message: "Id isn't valid"
    })
  }
})

router.get("/username/:name", (req, res, next) => {
  const query = { "name": req.params.name }
  playerService.find(id = null, query)
    .then(result => {
      res.status(200).json({
        players: result
      })
      console.log(result);
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.delete("/:id", (req, res, next) => {
  const id = req.params.id
  playerService.remove(id)
    .then(result => {
      if (result.deletedCount !== 0) {
        res.status(200).json(result)
      } else {
        res.status(404).json({
          message: "That user doesn't exist"
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
      console.log(err);
    })
})

router.put('/:id', async (req, res, next) => {
  const playerId = req.params.id
  if (ObjectId.isValid(playerId)) {
    try {
      const player = await playerService.find(playerId)
      const update = req.body
      await player.updateOne(update)
      const updatedPlayer = await playerService.find(playerId)
      res.status(200).json(updatedPlayer)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

)


module.exports = router;