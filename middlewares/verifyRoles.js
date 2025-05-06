const jwt = require('jsonwebtoken');

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: 'Token no enviado o formato incorrecto (debe ser Bearer <token>)' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
      }

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'No tienes permisos para acceder a este recurso' });
      }

      req.user = decoded; // Guardamos los datos del token para usarlos después
      next();
    });
  };
};

module.exports = verifyRoles;

