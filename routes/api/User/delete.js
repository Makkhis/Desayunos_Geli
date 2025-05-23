const express = require('express');
const router = express.Router();
const { deleteUser } = require('../../../services/Users/auth'); 
const authMiddleware = require('../../../middlewares/authMiddleware');
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();


router.delete("/deleteUser/:id", async (req, res) => {
    try { await deleteUser(req, res); } 
    catch (e) { res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message }); }
  });

module.exports = router;
    