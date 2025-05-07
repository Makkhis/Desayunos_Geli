const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../../../services/Users/auth'); 
const authMiddleware = require('../../../middlewares/authMiddleware');
const verifyRoles = require('../../../middlewares/verifyRoles');
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();

router.get("/getAllUsers", authMiddleware, verifyRoles("admin"), async (req, res) => {
  await getUsers(req, res);
});

module.exports = router;