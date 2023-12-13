const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    // Check for required fields
    if (!name || !price) return res.status(400).json({ error: 'Please fill the required fields' });

    // Create a new product
    const newProduct = new Product({ name, price });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price } = req.body;
    // Check for required fields
    if (!name || !price) return res.status(400).json({ error: 'Please fill the required fields' });

    // Find and update product
    const product = await Product.findByIdAndUpdate(productId, { name, price }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find and delete product
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
