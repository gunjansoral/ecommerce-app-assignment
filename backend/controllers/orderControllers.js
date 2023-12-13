const Order = require('../models/Order');

exports.checkout = async (req, res) => {
  try {
    const { userId, products } = req.body;
    if (!userId || !products) return res.status(400).json({
      error: "Invalid input data"
    })

    const order = new Order({ userId, products });
    await order.save();

    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
