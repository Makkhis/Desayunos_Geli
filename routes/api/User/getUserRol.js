const express = require('express');
const router = express.Router();
const { searchUsersByRole } = require('../../../services/Users/auth'); 
const authMiddleware = require('../../../middlewares/authMiddleware');
const verifyRoles = require('../../../middlewares/verifyRoles');
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();

router.get("/searchUsersByRole", async (req, res) => {
    try { await searchUsersByRole(req, res); } 
    catch (e) { res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message }); }
  });
  
  

module.exports = router;