const router = require("express").Router();
const requireAdminAuth = require('../middleware/admin');
const conn = require("../db/dbConnection");



// Create a new product
router.post('/admin/products', requireAdminAuth, async (req, res) => {
  const { name, description, price } = req.body;

  const product = new Product({ name, description, price });

  await product.save();

  res.send(product);
});

// Get all products
router.get('/admin/products', requireAdminAuth, async (req, res) => {
  const products = await Product.find();

  res.send(products);
});

// Get a single product
router.get('/admin/products/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.send(product);
});

// Update a product
router.patch('/admin/products/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const product = await Product.findByIdAndUpdate(
    id,
    { name, description, price },
    { new: true }
  );

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.send(product);
});

// Delete a product
router.delete('/admin/products/:id', requireAdminAuth, async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.send(product);
});

module.exports = router;