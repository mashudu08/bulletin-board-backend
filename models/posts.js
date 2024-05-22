const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User", // Reference to the User model for the author
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
