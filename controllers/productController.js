import Product from '../models/productSchema.js';

const createProduct = async (req, res) => {
  try {
    const {title, description, price, image} = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      image
    });

    return res.status(201).json({ 
        status: 'success', 
        data: { product } 
    });
  } catch (err) {
    console.log('Error: ', err);
    return res.status(400).json({ 
        status: 'fail', 
        message: err.message 
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({ 
        status: 'success', 
        data: { products } 
    });
  } catch (err) {
    return res.status(400).json({ 
        status: 'fail', 
        message: err.message 
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'Product not found' 
      });
    }

    return res.status(200).json({ 
      status: 'success', 
      data: { product } 
    });
  } catch (err) {
    return res.status(400).json({ 
      status: 'fail', 
      message: err.message 
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        status: 'fail', 
        message: 'Product not found' 
      });
    }

    return res.status(204).json({ 
      status: 'success', 
      message: 'Product deleted successfully' 
    });
  } catch (err) {
    return res.status(400).json({ 
      status: 'fail', 
      message: err.message 
    });
  }
};


export {createProduct, getAllProducts, updateProduct, deleteProduct}