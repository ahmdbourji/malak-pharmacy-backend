const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// Create product with image upload
exports.createProduct = async (req, res) => {
  try {
    let imagePath = null;
    if (req.file) {
      imagePath = `${req.file.filename}`;  // path to serve images statically
    }

    const newProduct = await Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      images: imagePath,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product with image upload
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let imagePath = null;
    if (req.file) {
      imagePath = `/images/${req.file.filename}`;
    }

    const updatedData = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
    };

    if (imagePath) {
      updatedData.images = imagePath;
    }

    const [updated] = await Product.update(updatedData, { where: { id } });

    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Correctly defined outside updateProduct
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.images) {
      const imagePath = path.join(__dirname, '..', product.images);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn('Image deletion failed:', err.message);
      });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



