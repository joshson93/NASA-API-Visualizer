const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(`mongodb://localhost:27017/MVP`);

const db = mongoose.connection;

module.exports = db;
