const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const appRoute = require('./routes');
const { connectToMongoDB } = require('./db/connectToMongoDB');

dotenv.config();
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies from incoming requests
app.use(cookieParser());
app.use(cors());
app.use('/api', appRoute); // Routers

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
