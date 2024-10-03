const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plasticHistory: [{
    plasticAdded: { type: Number, required: true },
    earned: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  }],
  creditScore: { type: Number, default: 0 },
  resetToken: { type: String, default: undefined } // For password reset
});

module.exports = mongoose.model('User', userSchema);
