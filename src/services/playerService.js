const connect = require('./../services/mongodb')
const PlayerModel = require('./../models/player')
const mongoose = require('mongoose');

const createPlayer = (name, password, age, role) => {
    return newPlayer = new PlayerModel({
        _id: mongoose.Types.ObjectId(),
        name,
        password,
        age,
        role
    })
}

const save = async (newPlayer) => {
    try {
        connect // redundant
        return await newPlayer.save()
        // redundant -> return result
    } catch (err) {
        return err
    }
}
// should return an array of objects
const findByQuery = async query => {
    try {
        const result = await PlayerModel.find(query)
        return result
    } catch (err) {
        return err
    }
}

// should return spacific object when user provide an id
const findById = async id => {
    try {
        const result = await PlayerModel.findById(id)
        return result
    } catch (err) {
        return err
    }
}

const remove = async id => {
    try {
        const result = await PlayerModel.deleteOne({
            _id: id
        })
        return result
    } catch (err) {
        return err
    }
}
// payload -> { name: 'david', age: 26 }
// { name: 'omri' } -> { namde: 'david', age: 26 } 
// { name: 'omri' } -> { name: 'david' }
const updateOne = async (id, payload) => {
    try {
        const { name } = payload
        const result = await PlayerModel.updateOne({
            _id: id
        }, payload)
        return result
    } catch (err) {
        return err
    }
}

const updateUserBlaBla = async (id, name, age, friend) => {
    return updateOne(id, { $set: { name, age, friend } })
}

module.exports = {
    save,
    findById,
    findByQuery,
    remove,
    updateOne,
    createPlayer
}