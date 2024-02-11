const express = require('express');

const protectedRoute = require('../middlewares/protectedRoute');
const { getUsersForSidebar } = require('../controllers/user.controller');

const userRoutes = express.Router();

userRoutes.get('/', protectedRoute, getUsersForSidebar);

module.exports = userRoutes;