const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  foodName: {
    type: String,
    required: [true, 'Name is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  foodPrice: {
    type: Number,
    required: [true, 'Price is required']
  },
  userID: String
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;