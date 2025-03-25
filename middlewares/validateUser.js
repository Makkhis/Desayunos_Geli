const { StatusCodes } = require("http-status-codes");

const validateUser = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Todos los campos son obligatorios." });
    }

    if (password.length < 6) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "La contraseña debe tener al menos 6 caracteres." });
    }

    next(); // Si todo está bien, continúa con la ejecución de la ruta
};

module.exports = validateUser;
