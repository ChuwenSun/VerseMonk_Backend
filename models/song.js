const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  features: {
    type: [String], // Array of strings
  },
  lyrics: {
    type: String,
  },
  language_cld3: {
    type: String,
  },
  language_ft: {
    type: String,
  },
  language: {
    type: String,
  },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
