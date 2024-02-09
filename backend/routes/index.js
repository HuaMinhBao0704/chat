const express = require('express');

// list of routes 
const authRoutes = require('./auth.routes');
const messageRoutes = require('./message.routes');

const appRoute = express.Router();

appRoute.use("/auth", authRoutes);
appRoute.use('/message', messageRoutes);


module.exports = appRoute;
