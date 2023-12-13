const express = require('express');
const router = express.Router();

router.post('/order/checkout', checkout)
router.get('/order/history/:userId', getOrderHistory);
router.get('/order/:orderId', getOrderDetails);

module.exports = router;