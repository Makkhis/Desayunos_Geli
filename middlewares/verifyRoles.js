const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ 
        error: 'Token no enviado o formato incorrecto (debe ser Bearer <token>)' 
      });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(StatusCodes.FORBIDDEN).json({ 
          error: 'Token inválido o expirado' 
        });
      }

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(StatusCodes.FORBIDDEN).json({ 
          error: `No tienes permisos para acceder a este recurso. Se requiere rol: ${allowedRoles.join(", ")}` 
        });
      }

      req.user = decoded; // ✅ Guardamos datos del token
      next();
    });
  };
};

module.exports = verifyRoles;

