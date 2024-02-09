const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const appRoute = require('./routes');
const { connectToMongoDB } = require('./db/connectToMongoDB');

dotenv.config();
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies from incoming requests
app.use(cookieParser());
app.use('/api/v1', appRoute); // Routers

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
