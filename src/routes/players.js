const express = require('express');
const { ObjectId } = require('mongoose').Types;
const playerService = require('../services/playerService');


const router = express.Router();

router.post('/', async (req, res) => {
  const {
    name, password, age, role,
  } = req.body;
  const newPlayer = playerService.createPlayer(name, password, age, role);
  try {
    const result = await playerService.save(newPlayer);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
});


router.get('/', async (req, res) => {
  try {
    const result = await playerService.findByQuery();
    res.status(200).json({
      players: result,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Id isn't valid",
    });
  }
  try {
    const result = await playerService.findById(id);
    if (!result) {
      res.status(404).json({
        message: "That player doesn't exist",
      });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    throw error;
  }
});

// Refactor shouldn't return 500 if player doesn't exist
router.get('/username/:name', async (req, res) => {
  const query = { name: req.params.name };
  try {
    const result = await playerService.findByQuery(query);
    res.status(200).json({
      players: result[0].name,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Id isn't valid",
    });
  }
  try {
    const result = await playerService.remove(id);
    if (result.deletedCount !== 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: "That user doesn't exist",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    try {
      const upatedPlayer = await playerService.updateOne(id, req.body);
      res.status(200).json(upatedPlayer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});
// TODO: Add airbnb eslint

module.exports = router;
