const express = require('express');
const router = express.Router();
const authService = require('../../../services/Users/auth');

const { StatusCodes } = require("http-status-codes");
require('dotenv').config();



router.get("/readUser", async(req, res) =>{
    try{
        const user = await authService.readUser(req, res);
        return res.status(StatusCodes.OK).json({ user });
    }catch{
        return res.status(StatusCodes.NOT_FOUND);
    }
});

module.exports = router;