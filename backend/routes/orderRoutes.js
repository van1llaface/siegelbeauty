const express = require('express');
const orderController = require('./../controllers/orderController')
const orderRouter = express.Router();

orderRouter
.route('/')
.post(orderController.newOrder)
.get(orderController.getOrders)

orderRouter
.route('/:id')
.delete(orderController.deleteOrder)

orderRouter
.route('/:id/approve')
.patch(orderController.approveOrder)

orderRouter
.route('/:id/decline')
.patch(orderController.declineOrder)

module.exports = orderRouter;