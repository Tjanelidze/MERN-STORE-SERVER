import express from 'express';

import protect from '../middleware/authMiddleware.js';
import productController from '../controllers/productController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, productController.getProducts)
  .post(protect, productController.addProduct);

router
  .route('/:productId')
  .post(protect, productController.rateProduct)
  .put(protect, productController.updateProduct)
  .delete(protect, productController.deleteProduct);

export default router;
