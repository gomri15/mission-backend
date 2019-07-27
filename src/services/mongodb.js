const mongoose = require('mongoose');
const { MONGO_URL, DB } = require('./../config')

class Database {
    constructor() {
        this._connect()
    }

    async _connect() {
        try {
            await mongoose.connect(`${MONGO_URL}/${DB}`, {
                useNewUrlParser: true
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new Database()