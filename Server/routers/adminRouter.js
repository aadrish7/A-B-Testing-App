const express = require('express');
const router = express.Router();
const AdminVersion = require('../models/adminModel');


router.patch('/setAdminVersion', async (req, res) => {
  const { version } = req.body;
  if (version !== 'A' && version !== 'B' && version !== null) {
    return res.status(400).json({ error: 'Invalid version. Must be either "A" or "B"' });
  }

  try {
    const adminVersion = await AdminVersion.findOne();
    if (!adminVersion) {
      return res.status(404).json({ error: 'AdminVersion record not found' });
    }
    adminVersion.adminSelectedVersion = version;
    await adminVersion.save();
    return res.json({ message: 'AdminSelectedVersion updated successfully', adminSelectedVersion: adminVersion.adminSelectedVersion });
  } catch (error) {
    console.error('Error updating AdminSelectedVersion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/getAdminVersion', async (req, res) => {
  try {
    const adminVersion = await AdminVersion.findOne();
    if (!adminVersion) {
      return res.json({ adminSelectedVersion: null });
    }
    res.json({ adminSelectedVersion: adminVersion.adminSelectedVersion });
  } catch (error) {
    console.error('Error fetching admin version:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
