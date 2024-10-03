const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure this path is correct based on your project structure
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, aadhar, phone,plasticHistory } = req.body;

  // Check for required fields
  if (!username || !email || !password || !aadhar || !phone) {
    return res.status(400).json({ msg: 'All fields are required.' });
  }

  try {
    // Check if Aadhar or Phone already exists
    const existingUser = await User.findOne({ $or: [{ aadhar }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ msg: 'Aadhar or Phone number already exists.' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      aadhar,
      phone,
      plasticHistory
    });

    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check for required fields
  if (!username || !password) {
    return res.status(400).json({ msg: 'All fields are required.' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // User authenticated successfully
    res.status(200).json({ msg: 'Login successful', user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;