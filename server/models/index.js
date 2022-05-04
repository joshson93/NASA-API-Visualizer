const mongoose = require('mongoose');
const db = require('../database');
const pictureSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  description: String,
  location: String,
  author: String,
});

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
