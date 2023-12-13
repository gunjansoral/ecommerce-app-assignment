const express = require('express');
const router = express.Router();

router.post('/admin/generate-discount', generateDiscountCode);
router.get('/admin/store-stats', getStoreStats);

module.exports = router;