import express from 'express';
import productController from '../controllers/productController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, productController.addProduct);

export default router;
