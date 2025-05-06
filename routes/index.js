const express = require("express");
const unprotectedRoutes = express.Router();
const protectedRoutes = express.Router();

// 👇 Rutas públicas
unprotectedRoutes.use("/api/User", require("./api/User/auth"));

// 👇 Rutas protegidas (CRUD que sí necesitan token)
protectedRoutes.use("/api/User", require("./api/User/update")); 

module.exports = { unprotectedRoutes, protectedRoutes };

