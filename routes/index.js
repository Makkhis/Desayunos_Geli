const express = require("express");

// Rutas públicas
const unprotectedRoutes = express.Router();
unprotectedRoutes.get("/", (req, res) => {
  res.send("Ruta pública");
});

// Rutas protegidas
const protectedRoutes = express.Router();
protectedRoutes.get("/dashboard", (req, res) => {
  res.send("Ruta protegida");
});

module.exports = { unprotectedRoutes, protectedRoutes };
