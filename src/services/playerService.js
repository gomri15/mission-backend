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
    const { name, password, age, role } = payload
    try {
        const player = await findById(id)
        const playerDateToUpate = {
            name: name || player.name,
            password: password || player.password,
            age: age || player.age,
            role: role || player.role
        }
        // const nameToUpdate = name || player.name
        // const passwordToUpdate = password || player.password
        // const ageToUpdate = age || player.age
        // const roleToUpdate = role || player.role
        player.name = playerDateToUpate.name
        player.password = playerDateToUpate.password
        player.age = playerDateToUpate.age
        player.role = playerDateToUpate.role
        return await save(player)
    } catch (error) {
        return error;
    }
    // please consider how to improve this function
    // this is not the right way to do update to row in mongoDB
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