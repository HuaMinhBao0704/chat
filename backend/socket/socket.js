const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

const userSocketMap = {}; // {userId: socketId}

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != 'undefined') userSocketMap[userId] = socket.id;

  // io.emit() -> send events to all connected clients
  io.emit('get_online_users', Object.keys(userSocketMap));

  // socket.on() -> listen for events from the client
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);

    delete userSocketMap[userId];

    io.emit('get_online_users', Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server, getReceiverSocketId };
