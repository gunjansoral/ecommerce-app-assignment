const DiscountCode = require('../models/DiscountCode');
const Order = require('../models/Order');

exports.checkout = async (req, res) => {
  try {
    const { userId, products, discountCode } = req.body;

    // Validation checks for input data
    if (!userId || !products) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    let discountApplied = 0;
    let discountedProducts = products;

    // Apply discount code if provided
    if (discountCode) {
      const isValidCode = await DiscountCode.findOne({ code: discountCode, used: false });

      if (isValidCode) {
        // Applying a 10% discount for demonstration purposes
        discountApplied = 0.1;

        // Apply discount to products
        discountedProducts = products.map(product => ({
          ...product,
          discountedPrice: product.price - (product.price * discountApplied),
        }));
      } else {
        return res.status(400).json({ message: 'Invalid discount code' });
      }
    }

    // Create order with discounted products
    const order = new Order({ userId, products: discountedProducts });
    await order.save();

    res.status(200).json({ message: 'Order placed successfully', order, discountApplied });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user's order history
    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch details of a specific order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
