const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  aadhar: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // plasticHistory now contains an array of strings (representing plastic IDs)
  plasticHistory: [{ type: String }],
  resetToken: { type: String, default: undefined }
});

// Export the model
module.exports = mongoose.model('User', userSchema);
