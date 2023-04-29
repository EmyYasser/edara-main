const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // Add other fields as necessary
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;