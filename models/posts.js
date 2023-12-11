const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  desc: { type: String, required: true, maxlength: 1000 }, // Adjusted from 100 to 1000 for a more realistic description length
  img: { type: String, maxlength: 255 },
  date: { type: Date, default: Date.now},
  cat: { type: String, required: true, maxlength: 255 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User model
});

module.exports = mongoose.model('Post', postSchema);
