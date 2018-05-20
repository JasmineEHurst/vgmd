const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  youtube_link: {
    type: String,
    required: true
  },
  soundtrack: {
    type: String,
    required: true
  },
  composer: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  }
});
module.exports = Song = mongoose.model("songs", SongSchema);
