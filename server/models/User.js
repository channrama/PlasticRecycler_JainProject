const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  aadhar: { type: String, required: true, unique: true }, // Aadhar should be unique and required
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plasticHistory: [{
    plasticAdded: { type: Number, required: true },
    earned: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  }],
  creditScore: { type: Number, default: 0 },
  resetToken: { type: String, default: undefined }
});

module.exports = mongoose.model('User', userSchema);
