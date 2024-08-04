const Tweet = require('../models/Tweet');

// Function to post a tweet
const postTweet = async (req, res) => {
  const { text } = req.body;
  const userId = req.user.userId; // Ensure userId is available from authentication middleware

  // Check if text and userId are provided
  if (!text || !userId) {
    return res.status(400).json({ error: 'Tweet text and user ID are required' });
  }

  try {
    // Create a new tweet
    const tweet = new Tweet({ userId, text, createdAt: new Date() });
    await tweet.save();
    res.status(201).json({ message: 'Tweet posted successfully', tweet });
  } catch (error) {
    res.status(500).json({ error: 'Error posting tweet: ' + error.message });
  }
};

// Function to get the timeline of a user
const getTimeline = async (req, res) => {
  const userId = req.params.userId;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Fetch tweets for the user
    const tweets = await Tweet.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching timeline: ' + error.message });
  }
};

module.exports = { postTweet, getTimeline };
