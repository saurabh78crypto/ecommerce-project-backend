import express from 'express';
import {getAllProducts, createProduct, updateProduct, deleteProduct} from '../controllers/productController.js';
import {protect} from '../middleware/authMiddleware.js';
import {restrictTo} from '../middleware/roleMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(protect, restrictTo('superadmin'), createProduct);

router
  .route('/:id')
  .put(protect, restrictTo('superadmin'), updateProduct)
  .delete(protect, restrictTo('superadmin'), deleteProduct);
  
  
export default router;
