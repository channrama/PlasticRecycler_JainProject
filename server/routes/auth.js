const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct based on your project structure
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for security

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, aadhar, phone, plasticHistory } = req.body;

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

    // Generate JWT
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h' // Token valid for 1 hour
    });

    // Send token and user details in the response
    res.status(200).json({ 
      msg: 'Login successful', 
      token, 
      user: {
        username: user.username,
        email: user.email,
        aadhar: user.aadhar,
        phone: user.phone,
        plasticHistory: user.plasticHistory // Include other details if necessary
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
