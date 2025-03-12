const express = require('express');
const router = express.Router();
const authService = require('../../../services/Users/auth');
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();



router.put("/updateUser", async(req, res) =>{
    try{
        const user = await authService.updateUser(req, res);
        return res.status(StatusCodes.OK).json({error: "User updated correctly", user});
    }catch{
        return res.status(StatusCodes.NOT_FOUND);
    }
});

module.exports = router;