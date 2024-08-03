import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [
    {
      product: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        default: 1 
      }
    }
  ],
  shippingAddress: { 
    type: String 
  }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
