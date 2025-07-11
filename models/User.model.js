
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: String,
  type: String,
  extension: String,
  size: Number,
  uploadTime: Date
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  media: mediaSchema
});

module.exports = mongoose.model('User', userSchema);
