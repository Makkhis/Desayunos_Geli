const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Acceso denegado. No hay token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next(); // Importante: llama a next() para continuar con la siguiente función
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token inválido." });
    }
};

module.exports = authMiddleware; // Exporta correctamente
