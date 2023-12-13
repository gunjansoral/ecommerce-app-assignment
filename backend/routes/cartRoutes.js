const express = require('express');
const router = express.Router();

router.post('/cart/add-to-cart', addToCart);
router.post('/cart/remove-from-cart', removeFromCart);
router.post('/cart/update-quantity', updateQuantity);

module.exports = router;