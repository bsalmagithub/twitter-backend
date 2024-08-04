const express = require('express');
const Tweet = require('../models/Tweet');
const router = express.Router();

// Post a tweet
router.post('/', async (req, res) => {
  const { userId, text } = req.body;

  // Validate input
  if (!userId || !text) {
    return res.status(400).json({ message: 'User ID and text are required' });
  }

  try {
    const tweet = new Tweet({ userId, text });
    await tweet.save();
    res.status(201).json({ message: 'Tweet posted successfully', tweet });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch tweets by userId
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const tweets = await Tweet.find({ userId }).sort({ createdAt: -1 });
    if (tweets.length === 0) {
      return res.status(404).json({ message: 'No tweets found for this user' });
    }
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
