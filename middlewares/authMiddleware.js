const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Acceso denegado. No hay token." });
    }

    const token = authHeader.split(' ')[1]; // Separa "Bearer <token>" y toma solo el token

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token inválido." });
    }
};


module.exports = authMiddleware;
