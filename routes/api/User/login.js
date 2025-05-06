const express = require('express');
const router = express.Router();
const { login } = require('../../../services/Users/auth'); 
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();



// Login
router.post("/loginUser", async (req, res) => {
  try {
    await login(req, res);
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
});

module.exports = router; 
