const express = require('express');
const router = express.Router();
const { register } = require('../../../services/Users/auth'); 
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();

// ⛔️ Esto NO debe tener verificación
router.post("/registerUser", async (req, res) => {
  try {
    await register(req, res); 
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
});

module.exports = router;




