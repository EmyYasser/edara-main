const router = require("express").Router();
const requireAdminAuth = require('../middleware/authorize');
const WarehouseProduct = require('../db/WarehouseProduct');
const conn = require("../db/dbConnection");

// Create a new warehouse product
router.post(
  '/admin/warehouses/:warehouseId/products',
  requireAdminAuth,
  async (req, res) => {
    const { warehouseId } = req.params;
    const { productId, stockQuantity } = req.body;

    const warehouseProduct = new WarehouseProduct({
      warehouseId,
      productId,
      stockQuantity,
    });

    await warehouseProduct.save();

    res.send(warehouseProduct);
  }
);

// Get all warehouse products for a warehouse
router.get(
  '/admin/warehouses/:warehouseId/products',
  requireAdminAuth,
  async (req, res) => {
    const { warehouseId } = req.params;

    const warehouseProducts = await WarehouseProduct.find({
      warehouseId,
    }).populate('productId');

    res.send(warehouseProducts);
  }
);

// Get a single warehouse product
router.get(
  '/admin/warehouses/:warehouseId/products/:id',
  requireAdminAuth,
  async (req, res) => {
    const { id } = req.params;

    const warehouseProduct = await WarehouseProduct.findById(id).populate(
      'productId'
    );

    if (!warehouseProduct) {
      return res.status(404).send('Warehouse product not found');
    }

    res.send(warehouseProduct);
  }
);

// Update a warehouse product
router.patch(
  '/admin/warehouses/:warehouseId/products/:id',
  requireAdminAuth,
  async (req, res) => {
    const { id } = req.params;
    const { stockQuantity } = req.body;

    const warehouseProduct = await WarehouseProduct.findByIdAndUpdate(
      id,
      { stockQuantity },
      { new: true }
    );

    if (!warehouseProduct) {
      return res.status(404).send('Warehouse product not found');
    }

    res.send(warehouseProduct);
  }
);

// Delete a warehouse product
router.delete(
  '/admin/warehouses/:warehouseId/products/:id',
  requireAdminAuth,
  async (req, res) => {
    const { id } = req.params;

    const warehouseProduct = await WarehouseProduct.findByIdAndDelete(id);

    if (!warehouseProduct) {
      return res.status(404).send('Warehouse product not found');
    }

    res.send(warehouseProduct);
  }
);

module.exports = router;