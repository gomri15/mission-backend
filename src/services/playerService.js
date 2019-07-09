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

const find = async (id) => {
    try {
        const result = await PlayerModel.findById(id)
        console.log(result);
        return result
    } catch (err) {
        console.log(err);
        return err
    }
}

module.exports = {
    save,
    find
}