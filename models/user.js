const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // id: { type: Number, required: true, unique:true },
  username: { type: String, required: true, maxlength: 45 },
  email: { type: String, required: true, maxlength: 255 },
  password: { type: String, required: true, maxlength: 255 },
  img: { type: String, maxlength: 255 }
});

// userSchema.set('_id', false);

module.exports = mongoose.model('User', userSchema);

