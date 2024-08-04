const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, username: 1 }); // Adjust projection as needed
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:userId/timeline', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user to ensure it exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch tweets for the user
    const tweets = await Tweet.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
