const mongoose = require('mongoose');
const connect = require('./../services/mongodb');
const PlayerModel = require('./../models/player');

const createPlayer = (name, password, age, role) => newPlayer = new PlayerModel({
  _id: mongoose.Types.ObjectId(),
  name,
  password,
  age,
  role,
});

const save = async (newPlayer) => {
  try {
    return await newPlayer.save();
    // redundant -> return result
  } catch (err) {
    return err;
  }
};
// should return an array of objects
const findByQuery = async (query) => {
  try {
    const result = await PlayerModel.find(query);
    return result;
  } catch (err) {
    return err;
  }
};

// should return spacific object when user provide an id
const findById = async (id) => {
  try {
    const result = await PlayerModel.findById(id);
    return result;
  } catch (err) {
    return err;
  }
};

const remove = async (id) => {
  try {
    const result = await PlayerModel.deleteOne({
      _id: id,
    });
    return result;
  } catch (err) {
    return err;
  }
};

const updateOne = async (id, payload) => {
  try {
    const {
      name, password, age, role,
    } = payload;
    const player = await findById(id);
    const updatedPlayer = {
      name: name || player.name,
      password: password || player.password,
      age: age || player.age,
      role: role || player.role,
    };
    return await PlayerModel.update({ _id: id }, { $set: updatedPlayer });
  } catch (error) {
    return error;
  }
};


module.exports = {
  save,
  findById,
  findByQuery,
  remove,
  updateOne,
  createPlayer,
};
