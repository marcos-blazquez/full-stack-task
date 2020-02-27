const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  objectID: String,
  created_at: String,
  story_title: String,
  title: String,
  author: String,
  url: String,
  story_url: String,
  deleted: Boolean
});

mongoose.model("posts", postSchema);
