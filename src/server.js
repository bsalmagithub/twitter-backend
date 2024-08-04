const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const userRoutes = require('./routes/userRoutes');
const { protect } = require('./middleware/authMiddleware'); // Import the protect middleware

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

// Middleware
app.use(express.json());

// Public Routes (No authentication required)
app.use('/api/users', authRoutes); // Registration and Login

// Protected Routes (Requires authentication)
app.use('/api/tweets', protect, tweetRoutes); // Tweet operations
app.use('/api/all-users', protect, userRoutes); // List all users

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Set the port and start the server
const PORT = process.env.PORT || 5001; // Default to 5001 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
