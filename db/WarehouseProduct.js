const mongoose = require('mongoose');

const warehouseProductSchema = new mongoose.Schema({
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  // Add other fields as necessary
});

const WarehouseProduct = mongoose.model(
  'WarehouseProduct',
  warehouseProductSchema
);

module.exports = WarehouseProduct;
