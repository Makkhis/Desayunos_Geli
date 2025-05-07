const express = require('express');
const router = express.Router();
require('dotenv').config();

// Importa todos tus endpoints protegidos
const updateUser = require('./api/User/update');
const deleteUser = require('./api/User/delete');
const getAllUsers = require('./api/User/getAllUsers');
const getUserById = require('./api/User/getUserID');
const getUserEmail = require('./api/User/getUserEmail');
const getUserRol = require('./api/User/getUserRol');
const countUsers = require('./api/User/countUsers');
const deactivateUser = require('./api/User/desUser');
const activateUser = require('./api/User/actUser');
//const updateMyProfileRouter = require('./api/User/updateMyProfile');
//const getMyProfileRouter = require('./api/User/getMyProfile');


// 👇 Montas cada uno en la ruta
router.use('/User', activateUser);
router.use('/User', deactivateUser);
router.use('/User', deleteUser);
router.use('/User', getAllUsers);
router.use('/User', getUserById);
router.use('/User', getUserRol);
router.use('/User', getUserEmail);
router.use('/User', updateUser);
router.use('/User', countUsers);


module.exports = router;

