const express = require('express');
const router = express.Router();
const { updateUser } = require('../../../services/Users/auth'); 
const authMiddleware = require('../../../middlewares/authMiddleware.js');
const verifyRoles = require('../../../middlewares/verifyRoles');
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();



router.put("/updateUser/:id", async (req, res) => {
    try { 
        await updateUser(req, res); } 
    catch (e) { 
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message }); }
  });

module.exports = router;