const express = require("express");
const sequelize = require("./config/databases");
const authMiddleware = require("./middlewares/authMiddleware");
const logger = require("./middlewares/logger");
const routes = require("./routes/index");
require("dotenv").config();

// 👉 Importa los modelos antes de sync()
require("./models/User"); 

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(logger);

// Conectar a la base de datos
sequelize
  .sync()
  .then(() => console.log("✅ DB is ready"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Rutas públicas (NO requieren autenticación)
app.use(routes.unprotectedRoutes); 

// Middleware de autenticación (SOLO después de las públicas)
app.use(authMiddleware);

// Rutas protegidas (REQUIEREN token)
app.use(routes.protectedRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT} 🏃`);
});
