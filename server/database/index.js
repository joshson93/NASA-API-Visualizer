const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.htwvb.mongodb.net/MVP`
);

const db = mongoose.connection;

module.exports = db;
