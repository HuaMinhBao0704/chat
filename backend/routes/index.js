const express = require('express');
const appRoute = express.Router();

// list of routes 
const authRoutes = require('./auth.routes');
const messageRoutes = require('./message.routes');
const userRoutes = require('./user.routes');

appRoute.use("/auth", authRoutes);
appRoute.use('/message', messageRoutes);
appRoute.use("/user", userRoutes);

module.exports = appRoute;
