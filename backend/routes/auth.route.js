const express = require('express');

const { signUp, login, logout } = require('../controllers/auth.controller');

const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/login", login);
authRoute.post("/logout", logout);

module.exports = authRoute;
