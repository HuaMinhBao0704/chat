const express = require('express');

const { signUp, login, logout } = require('../controllers/auth.controller');

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

module.exports = authRoutes;
