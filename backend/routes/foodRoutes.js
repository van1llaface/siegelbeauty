const express = require('express');
const foodRouter = express.Router();
const auth = require ('./../middleware/auth');
const foodController = require('./../controllers/foodController');

foodRouter
.route('/')
.post(foodController.createFood)
.get(foodController.getFoods)

foodRouter
.route('/:id')
.patch(foodController.editFood)
.delete(foodController.deleteFood)

module.exports = foodRouter;