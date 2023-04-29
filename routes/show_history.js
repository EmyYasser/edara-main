const express = require('express');
const router = express.Router();

// Import the StockRequest model and any other dependencies
const StockRequest = require('../db/dbConnection');

// GET all stock request history
router.get('/history', async (req, res) => {
  try {
    const requests = await StockRequest.find({}).populate('supervisor', 'name');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;