const mongoose = require('mongoose');
const { MONGO_URL, DB } = require('./../config');

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      const connection = '';
      this.connection = await mongoose.connect(`${MONGO_URL}/${DB}`, {
        useNewUrlParser: true,
      });
      return connection;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new Database();
