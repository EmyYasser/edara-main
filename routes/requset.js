const express = require('express');
const router = express.Router();

// Import the StockRequest model and any other dependencies
const StockRequest = require('../db/dbConnection');

// GET all requests
router.get('/', async (req, res) => {
  try {
    const requests = await StockRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single request
router.get('/:id', getRequest, (req, res) => {
  res.json(res.request);
});

// POST a new request
router.post('/', async (req, res) => {
  const request = new StockRequest({
    itemName: req.body.itemName,
    quantity: req.body.quantity,
    status: req.body.status,
  });

  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a request
router.patch('/:id', getRequest, async (req, res) => {
  if (req.body.itemName != null) {
    res.request.itemName = req.body.itemName;
  }

  if (req.body.quantity != null) {
    res.request.quantity = req.body.quantity;
  }

  if (req.body.status != null) {
    res.request.status = req.body.status;
  }

  try {
    const updatedRequest = await res.request.save();
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a request
router.delete('/:id', getRequest, async (req, res) => {
  try {
    await res.request.remove();
    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single request by ID
async function getRequest(req, res, next) {
  try {
    const request = await StockRequest.findById(req.params.id);
    if (request == null) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.request = request;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;