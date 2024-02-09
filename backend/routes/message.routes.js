const express = require('express');

const {
  sendMessage,
  getAllMessagesInConversation,
} = require('../controllers/message.controller');
const protectedRoute = require('../middlewares/protectedRoute');

const messageRoutes = express.Router();

messageRoutes.get('/:id', protectedRoute, getAllMessagesInConversation);
messageRoutes.post('/send/:id', protectedRoute, sendMessage);

module.exports = messageRoutes;
