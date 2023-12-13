const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input data
    if (!userId || !productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Create a new cart item
    const cartItem = new Cart({ userId, productId, quantity });
    await cartItem.save();

    res.status(200).json({ message: 'Item added to cart successfully', cartItem });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate input data
    if (!userId || !productId) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Find and delete cart item
    await Cart.findOneAndDelete({ userId, productId });

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input data
    if (!userId || !productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Update cart item quantity
    await Cart.findOneAndUpdate({ userId, productId }, { quantity });

    res.status(200).json({ message: 'Cart item quantity updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user ID
    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Fetch cart items for the user
    const cartItems = await Cart.find({ userId });

    res.status(200).json({ cartItems });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
