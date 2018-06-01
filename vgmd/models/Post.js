const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  song: {
    type: Schema.Types.ObjectId,
    ref: "songs",
  },
  text: {
    type: String,
    required: true,
  },
})

module.exports = Post = mongoose.model("posts", PostSchema)
