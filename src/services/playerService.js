const connect = require('./../services/mongodb')
let PlayerModel = require('./../models/player')

const save = async (newPlayer) => {
    try {
        connect
        const result = await newPlayer.save()
        return result
    } catch (err) {
        return err
    }
}

const find = async (id = "") => {
    if (id) {
        try {
            const result = await PlayerModel.findById(id)
            return result
        } catch (err) {
            return err
        }
    } else {
        try {
            const result = await PlayerModel.find()
            return result
        } catch (err) {
            return err
        }
    }
}

const remove = async (id) => {
    try {
        const result = await PlayerModel.deleteOne({
            _id: id
        })
        return result
    } catch (err) {
        return err
    }
}

const updateOne = async (id, payload) => {
    try {
        const result = await PlayerModel.updateOne({
            _id: id
        }, {
            payload
        })
        return result
    } catch (err) {
        return err
    }
}

module.exports = {
    save,
    find,
    remove,
    updateOne
}