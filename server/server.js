const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware

// Load environment variables
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Middleware to parse JSON bodies

// Define API routes
app.use('/api/auth', authRoutes); // Prefix for authentication routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
