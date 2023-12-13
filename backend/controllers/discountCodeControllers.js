const DiscountCode = require('../models/DiscountCode');
const Order = require('../models/Order');

exports.generateDiscountCode = async (req, res) => {
  try {
    const { condition } = req.body;

    // Check if condition is satisfied for generating a discount code
    if (condition) {
      // Generate and save a new discount code
      const discountCode = new DiscountCode({ code: 'YOUR_GENERATED_CODE', used: true });
      await discountCode.save();
      res.status(200).json({ message: 'Discount code generated successfully', discountCode });
    } else {
      res.status(400).json({ message: 'Condition not satisfied for generating discount code' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getStoreStats = async (req, res) => {
  try {
    // Calculate various store statistics
    const totalItemsPurchased = await Order.countDocuments();
    const totalPurchaseAmount = await Order.aggregate([{ $group: { _id: null, totalAmount: { $sum: '$amount' } } }]);
    const discountCodes = await DiscountCode.find();
    const totalDiscountAmount = await DiscountCode.aggregate([
      { $match: { used: false } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
    ]);

    res.status(200).json({
      totalItemsPurchased,
      totalPurchaseAmount: totalPurchaseAmount.length > 0 ? totalPurchaseAmount[0].totalAmount : 0,
      discountCodes,
      totalDiscountAmount: totalDiscountAmount.length > 0 ? totalDiscountAmount[0].totalAmount : 0,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
