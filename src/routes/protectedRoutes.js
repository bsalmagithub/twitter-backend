const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { postTweet, getTimeline } = require('../controllers/tweetController');

const router = express.Router();

// Routes that require authentication
router.post('/tweets', protect, postTweet);
router.get('/users/:userId/timeline', protect, getTimeline);

module.exports = router;
