const express = require('express');

const { sendMessage } = require('../controllers/message.controller');
const protectedRoute = require('../middlewares/protectedRoute');

const messageRoutes = express.Router();

messageRoutes.post('/send/:id', protectedRoute, sendMessage);

module.exports = messageRoutes;
