const mongoose = require('mongoose');

const userSchema = new mongoose({
   userName: {
      type: String,
      required: true,
   },
   userImage: {
      type: String,
      required: true,
   },
   userEmail: {
      type: String,
      required: true,
   },
   userPassword: {
      type: mixed,
      required: true,
   },
   posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    }],
   created_at: {
      type: Date,
      default: Date.now,
   },
});
models.export = mongoose.model('User', userSchema);