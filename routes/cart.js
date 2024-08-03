import express  from 'express';
import {getCart, addToCart, checkoutCart }  from '../controllers/cartController.js';
import {protect}  from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getCart)
  .post(protect, addToCart);

router.post('/checkout', protect, checkoutCart);

export default router;
