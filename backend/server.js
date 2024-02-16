const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')

const appRoute = require('./routes');
const { connectToMongoDB } = require('./db/connectToMongoDB');
const { app, server } = require('./socket/socket');

dotenv.config();

// Middlewares
app.use(express.json()); // Parse JSON bodies from incoming requests
app.use(cookieParser());
app.use('/api', appRoute); // Routers
app.use(cors({ credentials: true }));

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
