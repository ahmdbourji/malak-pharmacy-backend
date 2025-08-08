// backend/controllers/product.controller.js
const Product = require('../models/Product');
const { v2: cloudinary } = require('cloudinary'); // ⬅️ لاستخدام destroy عند الحذف

// ────────────────────────────────────────────────
// 1) إنشاء منتج مع رفع صورة إلى Cloudinary
// ────────────────────────────────────────────────
exports.createProduct = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null; // رابط مباشر من Cloudinary

    const newProduct = await Product.create({
      name:        req.body.name,
      category:    req.body.category,
      price:       req.body.price,
      description: req.body.description,
      images:      imagePath,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ────────────────────────────────────────────────
// 2) جلب جميع المنتجات
// ────────────────────────────────────────────────
exports.getAllProducts = async (_, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ────────────────────────────────────────────────
// 3) تحديث منتج (مع إمكانية استبدال الصورة)
// ────────────────────────────────────────────────
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // إذا وُجدت صورة جديدة نرفعها ونضع رابطها
    const newImagePath = req.file ? req.file.path : null;

    // تحضير البيانات المُحدَّثة
    const updatedData = {
      name:        req.body.name,
      category:    req.body.category,
      price:       req.body.price,
      description: req.body.description,
      ...(newImagePath && { images: newImagePath }),
    };

    await Product.update(updatedData, { where: { id } });
    const updatedProduct = await Product.findByPk(id);

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ────────────────────────────────────────────────
// 4) حذف منتج (وملف الصورة في Cloudinary اختياريًا)
// ────────────────────────────────────────────────
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // ❗️اختياري: حذف الصورة من Cloudinary إن وُجدت
    if (product.images) {
      // public_id هو آخر جزء قبل الامتداد بعد upload/
      // مثال: https://res.cloudinary.com/<cloud>/image/upload/v1691446/abc123.png
      const publicId = product.images.split('/').pop().split('.')[0];
      cloudinary.uploader.destroy(`malak_pharmacy/${publicId}`, err => {
        if (err) console.warn('Cloudinary delete error:', err.message);
      });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




