const UserModel = require("../models/users/User.js");
const { status } = require("http-status");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(status.BAD_REQUEST)
        .json({ error: "Todos los campos son obligatorios." });
    }

    UserModel.create({ name, email, password });

    return res.json({
      mensaje: "Registered user",
      user: { name, email, password },
    });
  } catch (exception) {
    return exception.message;
  }
};

module.exports = { register };