const mongoose = require('mongoose');
const { MONGO_URL, DB } = require('./../config');

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(`${MONGO_URL}/${DB}`, {
        useNewUrlParser: true,
      });
    } catch (error) {
      return error;
    }
  }
}

module.exports = new Database();
