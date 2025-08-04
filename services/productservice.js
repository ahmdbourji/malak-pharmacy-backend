const Product = require('../models/Product');

async function getAllProducts() {
  return await Product.findAll();
}

module.exports = { getAllProducts };
