const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const AdminVersion = require('../models/adminModel');

router.get('/getversion', async (req, res) => {
  const { userId } = req.query;
  try {
    const adminVersion = await AdminVersion.findOne();
    if (!adminVersion) {
      return res.status(500).json({ error: 'Admin version not found' });
    }

    if (adminVersion.adminSelectedVersion === null) {
      let user = await User.findOne({ userId: userId });
      if (!user) {
        const randomVersion = Math.random() < 0.5 ? 'A' : 'B';
        user = new User({
          userId: userId,
          version: randomVersion,
          createdAt: new Date(),
          firstClick: null
        });
        await user.save();
        return res.json({ version: randomVersion });
      } else {
        return res.json({ version: user.version });
      }
    } else {
      const adminVersionSelected = adminVersion.adminSelectedVersion;
      let user = await User.findOne({ userId: userId });

      if (!user) {
        user = new User({
          userId: userId,
          version: adminVersionSelected,
          createdAt: new Date(),
          firstClick: null
        });
        await user.save();
      } else {
        if (user.version !== adminVersionSelected) {
        user.version = adminVersionSelected;
        user.createdAt = new Date();
        user.firstClick = null;
        await user.save();}
      }
      return res.json({ version: adminVersionSelected });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/updateFirstClick', async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const user = await User.findOne({ userId: userId });
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.firstClick == null) {
      user.firstClick = new Date();
      await user.save();
      return res.json({ message: 'firstClick updated successfully' });
    } else {
      console.log('firstClick is already selected');
      return res.status(400).json({ message: 'firstClick is already selected' });
    }
  } catch (error) {
    console.error('Error updating firstClick:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
