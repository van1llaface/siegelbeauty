const express = require('express');
const cartRouter = express.Router();
const cartController = require('./../controllers/cartController')
const auth = require('./../middleware/auth')

cartRouter
.route('/')
.post(auth, cartController.addToCart)
.get(auth, cartController.getCart)

cartRouter
.route('/:id')
.delete(auth, cartController.removeFromCart)

cartRouter
.route('/')
.delete(auth, cartController.clearCart)

module.exports = cartRouter