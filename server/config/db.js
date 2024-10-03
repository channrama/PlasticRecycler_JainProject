require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB without deprecated options
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;
