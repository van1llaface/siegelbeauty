const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  foodName: {
    type: String,
    required: [true, 'Name is required']
  },
  menuName: {
    type: String,
    required: [true, 'Menu is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  }
})

const Food = mongoose.model("Food", foodSchema)

module.exports = Food;