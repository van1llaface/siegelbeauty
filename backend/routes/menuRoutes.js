const express = require('express');
const menuController = require('./../controllers/menuController');
const menuRouter = express.Router();
const auth = require('./../middleware/auth');

menuRouter
.route('/')
.get(menuController.getMenus)
.post(auth, menuController.createMenu)

menuRouter
.route('/:id')
.patch(auth, menuController.editMenu)
.delete(auth, menuController.deleteMenu)

module.exports = menuRouter;