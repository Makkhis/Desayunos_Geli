/* const jwt = require('jsonwebtoken');

const authorizeRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      // Verifica si el rol del usuario está permitido
      if (!rolesPermitidos.includes(decoded.role)) {
        return res.status(403).json({ error: 'No tienes permisos para acceder a esta ruta.' });
      }

      // Adjunta el usuario al request
      req.user = decoded;

      next();

    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  };
};

module.exports = authorizeRoles; */
