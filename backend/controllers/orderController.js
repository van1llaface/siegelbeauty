const Order = require('./../models/orderModel');

exports.newOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, totalPrice, foods } = req.body;

    const order = new Order({
      customerName: customerName,
      customerEmail: customerEmail,
      totalPrice: totalPrice,
      foods: foods,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const count = await Order.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const orders = await Order.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      orders,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving orders' });
  }
};


exports.approveOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ID
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order status to "approved"
    order.status = 'approved';

    // Save the updated order
    await order.save();

    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while approving the order' });
  }
};

exports.declineOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ID
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order status to "declined"
    order.status = 'declined';

    // Save the updated order
    await order.save();

    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while declining the order' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    Order.findByIdAndDelete(id)
      .then((doc) => {
        [res.status(200).json({ message: 'Service deleted successfully' })];
      })
      .catch((error) => {
        res.status(404).json({ error: 'Failed to delete order' });
      });
  } catch (error) {
    res.status(404).json({ error: 'Failed to delete order' });
  }
};
