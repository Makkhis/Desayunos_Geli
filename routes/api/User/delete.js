const express = require('express');
const router = express.Router();
const authService = require('../../../services/Users/auth.js');
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();



router.delete("/deleteUser", async(req, res) =>{
    try{
        const user = await authService.deleteUser(req, res);
        return res.status(StatusCodes.OK).json({error: "User deleted correctly", user});
    }catch{
        return res.status(StatusCodes.NOT_FOUND);
    }
});

module.exports = router;
    