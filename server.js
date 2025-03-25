const express = require("express");
const sequelize = require("./config/databases");
const authMiddleware = require("./middlewares/authMiddleware"); // Middleware de autenticación
const logger = require("./middlewares/logger"); // Middleware de registro de solicitudes
const routes = require("./routes/index"); // Importamos las rutas
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// 🛠️ Middleware global
app.use(express.json()); // Para procesar JSON en las solicitudes
app.use(logger); // Middleware de logging

// 🛠️ Conectar a la base de datos
sequelize
  .sync()
  .then(() => console.log("✅ DB is ready"))
  .catch((err) => console.error("❌ DB connection error:", err));

// 🌐 Rutas públicas (NO requieren autenticación)
app.use(routes.unprotectedRoutes); 

// 🔒 Middleware de autenticación (debe ir antes de las rutas protegidas)
app.use(authMiddleware);

// 🌐 Rutas protegidas (REQUIEREN autenticación)
app.use(routes.protectedRoutes);

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT} 🏃`);
});
