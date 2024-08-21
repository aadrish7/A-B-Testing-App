
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/data', async (req, res) => {
  try {
    const versionACount = await User.countDocuments({ version: 'A' });
    const versionBCount = await User.countDocuments({ version: 'B' });
    const versionAClickedCount = await User.countDocuments({
      version: 'A',
      firstClick: { $ne: null }
    });
    const versionBClickedCount = await User.countDocuments({
      version: 'B',
      firstClick: { $ne: null }
    });
    res.json({
      versionACount,
      versionAClickedCount,
      versionBCount,
      versionBClickedCount
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
