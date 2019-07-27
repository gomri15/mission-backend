const express = require("express");
const playerService = require('../services/playerService')




// please consider using const above let

const router = express.Router();

router.post("/", function (req, res, next) {

  const { name, password, age, role } = req.body
  const newPlayer = playerService.createPlayer(name, password, age, role)
  // should be set in a service function something like createPlayer
  // router take a call
  // Database
  // service get response
  // router send the response back to the user

  // please be consistent with your code and use async await anywhere
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

// "" -> ''

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

// please use async await
router.get("/:id", (req, res, next) => {
  const id = req.params.id
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Id isn't valid"
    })
  }
  // id sure is valid
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
})

router.get("/username/:name", (req, res, next) => {
  const query = { name: req.params.name }
  playerService.find(null, query)
    .then(result => {
      res.status(200).json({
        players: result[0].name
      })
      console.log(result);
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.delete("/:id", (req, res, next) => {
  const id = req.params.id
  // please check id varification

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
      // please consider to improve this function
      // this is not the right way to do update to row in mongoDB
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