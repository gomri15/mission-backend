const express = require("express");
const playerService = require('../services/playerService')
const ObjectId = require('mongoose').Types.ObjectId;

// please consider using const above let

const router = express.Router();

router.post('/', async (req, res) => {

  const { name, password, age, role } = req.body
  const newPlayer = playerService.createPlayer(name, password, age, role)
  // should be set in a service function something like createPlayer
  // router take a call
  // Database
  // service get response
  // router send the response back to the user

  // please be consistent with your code and use async await anywhere
  try {
    const result = await playerService.save(newPlayer)
    console.log(result)
    res.status(201).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error
    })
  }
})

// "" -> ''

router.get('/', async (req, res, next) => {
  try {
    const result = await playerService.findByQuery()
    res.status(200).json({
      players: result
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// please use async await
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Id isn't valid"
    })
  }
  // id sure is valid
  try {
    const result = await playerService.findById(id)
    if (!result) {
      res.status(404).json({
        message: "That player doesn't exist"
      })
    } else {
      res.status(200).json(result)
    }
  } catch (error) {
    console.log(error);

  }
})

// Refactor shouldn't return 500 if player doesn't exist
router.get('/username/:name', async (req, res, next) => {
  const query = { name: req.params.name }
  try {
    const result = await playerService.findByQuery(query)
    res.status(200).json({
      players: result[0].name
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  // please check id varification
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Id isn't valid"
    })
  }
  try {
    const result = await playerService.remove(id)
    if (result.deletedCount !== 0) {
      res.status(200).json(result)
    } else {
      res.status(404).json({
        message: "That user doesn't exist"
      })
    }
  } catch (error) {
    res.status(500).json(err)
    console.log(err);
  }
})

router.put('/:id', async (req, res, next) => {
  const { id } = req.params
  if (ObjectId.isValid(id)) {
    try {
      const upatedPlayer = await playerService.updateOne(id, req.body)
      res.status(200).json(upatedPlayer)
    } catch (error) {
      res.status(500).json(error)
    }
  }
})
// TODO: Add airbnb eslint

module.exports = router;