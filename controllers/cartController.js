import Cart from '../models/cartSchema.js';
import Product from '../models/productSchema.js';
import nodemailer from 'nodemailer';

const addToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      const newCart = await Cart.create({ 
        user: req.user._id, 
        products: [{ 
            product: req.body.productId, 
            quantity: req.body.quantity 
        }] 
    });

      return res.status(201).json({ 
        status: 'success', 
        data: { cart: newCart } 
      });
    }

    cart.products.push({ 
        product: req.body.productId, 
        quantity: req.body.quantity 
    });

    await cart.save();

    return res.status(200).json({ 
        status: 'success', 
        data: { cart } 
    });
  } catch (err) {
    return res.status(400).json({ 
        status: 'fail', 
        message: err.message 
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');

    return res.status(200).json({ 
        status: 'success', 
        data: { cart } 
    });
  } catch (err) {
    return res.status(400).json({ 
        status: 'fail', 
        message: err.message 
    });
  }
};

const checkoutCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'No items in the cart' 
      });
    }

    cart.shippingAddress = req.body.shippingAddress;
    await cart.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: 'Ecommerce <ecommerce@example.com>',
      to: req.user.email,
      subject: 'Order Confirmation',
      text: `Your order has been placed successfully! Shipping address: ${req.body.shippingAddress}`
    };

    await transporter.sendMail(mailOptions);

    await Cart.findByIdAndDelete(cart._id);

    return res.status(200).json({ 
        status: 'success', 
        message: 'Order placed successfully' 
    });
  } catch (err) {
    return res.status(400).json({ 
        status: 'fail', 
        message: err.message 
    });
  }
};


export {addToCart, getCart, checkoutCart}