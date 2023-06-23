const Cart = require('./../models/cartModel');

exports.addToCart = (req, res) => {
  try {
    const { foodName, amount, foodPrice } = req.body;
    const userID = req.userID;
    Cart.findOne({ foodName: foodName, userID: userID }).then((existingFood) => {
      if (existingFood) {
        // If the item already exists in the cart, update the amount
        existingFood.amount += Number(amount);
        existingFood.foodPrice += Number(foodPrice);
        existingFood.save().then((updatedFood) => {
          res.status(200).json({
            message: 'Item added to cart',
          });
        });
      } else {
        // If the item does not exist in the cart, create a new cart item
        const newCartItem = new Cart({
          foodName: foodName,
          amount: amount,
          foodPrice: foodPrice,
          userID: userID
        });
        newCartItem.save().then((savedFood) => {
          res.status(200).json({
            message: 'Item added to cart',
          });
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.getCart = (req, res) => {
  try {
    const userID = req.userID;
    Cart.find({userID: userID}).then((doc) => {
      res.status(200).json(doc);
    });
  } catch {
    res.status(404).json({ error: 'Request failed' });
  }
};

exports.removeFromCart = (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.userID;
    Cart.findByIdAndDelete({_id: id, userID: userID})
      .then((doc) => {
        res.status(200).json({ message: 'Item successfully removed' });
      })
      .catch((error) => {
        res.status(404).json({ error: 'Request failed' });
      });
  } catch {
    res.status(404).json({ error: 'Request failed' });
  }
};

exports.clearCart = (req, res) => {
  try {
    const userID = req.userID;
    Cart.deleteMany({ userID: userID })
      .then(() => {
        res.status(200).json({ message: 'Cart cleared successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to clear cart' });
      });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};