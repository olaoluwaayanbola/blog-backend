const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   created_at: {
      type: Date,
      default: Date.now,
   },
   updated_at: {
      type: Date,
      default: Date.now,
   },
});

/**
 * this compiles the schema into a model
 * and allows you to use the schema in another files
 */
module.exports = mongoose.model('Post', postSchema);
