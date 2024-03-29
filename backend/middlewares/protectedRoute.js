const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

async function protectedRoute(req, res, next) {
  try {
    // check if token is in the cookie
    const token = req.cookies.jwt;
    
    // console.log('token: ', token);

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No token provided' });
    }

    // verify the token, if it's invalid, return an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // get user info in db without the password
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // add user to the request (next middlewares will have access to it)
    req.user = user;

    // if everything is ok, continue to the next middleware
    next();
  } catch (error) {
    console.log('Error in protectedRoute middlewares: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = protectedRoute;
 