const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// Import raw sample data set to a DB Collection
router.post('/import', async (req, res) => {
  try {
    await Data.insertMany(req.body);
    res.status(200).json({ message: 'Sample data imported successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error importing sample data' });
  }
});

// Fetch data from MongoDB
router.get('/', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;