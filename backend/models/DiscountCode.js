const { Schema, model } = require('mongoose');

const discountCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('DiscountCode', discountCodeSchema);

