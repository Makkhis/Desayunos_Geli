const express = require('express');
const router = express.Router();
const authService = require('../../../services/Users/auth');
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();

router.post("/registerUser", async(req, res) =>{
    try {
        const user = await authService.register(req, res);
        return res.status(StatusCodes.CREATED).json(user);
      } catch (exception) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
       }
});

module.exports = router;