// backend/routes/product.routes.js
const express = require('express');
const router  = express.Router();

const upload = require('../config/upload');          // ⬅️ Multer + Cloudinary
const productController  = require('../controllers/product.controller');
const authenticateToken  = require('../Middleware/authMiddleware');

// ⬇️ جلب كل المنتجات (عام)
router.get('/', productController.getAllProducts);

// ⬇️ مسارات محمية تتطلّب JWT + رفع صورة واحدة
router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  productController.createProduct
);

router.put(
  '/:id',
  authenticateToken,
  upload.single('image'),
  productController.updateProduct
);

// ⬇️ حذف منتج
router.delete(
  '/:id',
  authenticateToken,
  productController.deleteProduct
);

module.exports = router;
