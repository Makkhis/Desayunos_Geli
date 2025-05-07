const express = require('express');
const router = express.Router();
const { activateUser } = require('../../../services/Users/auth');
const authMiddleware = require('../../../middlewares/authMiddleware');
const verifyRoles = require('../../../middlewares/verifyRoles');
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();

router.patch("/activateUser/:id", async (req, res) => {
    try { await activateUser(req, res); } 
    catch (e) { res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message }); }
  });
  

module.exports = router; 
