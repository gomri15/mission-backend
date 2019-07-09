const connect = require('./../services/mongodb')

const save = async (newPlayer) => {
    try {
        connect
        const result = await newPlayer.save()
        console.log(result);
        return result
    } catch (err) {
        console.log(err);
        return err
    }
}

const find = async (newPlayer, query) => {
    try {
        connect
        const result = await newPlayer.find(query)
        console.log(result);
        return result
    } catch (err) {
        console.log(err);
        return err
    }
}

module.exports = {
    save: save(),
    find: find()
}