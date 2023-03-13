const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   token: {
      type: String,
      require: false,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
   user: {
      type: String,
      required: true,
   },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
