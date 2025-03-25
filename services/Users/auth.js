const UserModel = require("../../models/User.js");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Todos los campos son obligatorios." });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generar el token
    const token = jwt.sign({ email, name }, process.env.SECRET, { expiresIn: '13h' });

    // Crear usuario
    const user = await UserModel.create({ name, email, password: hashedPassword });

    return res.status(StatusCodes.CREATED).json({
      mensaje: "Usuario registrado correctamente",
      user: { id: user.id, name, email },
      token
    });

  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }

    await user.destroy();
    return res.status(StatusCodes.OK).json({ message: "Usuario eliminado correctamente." });

  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

const readUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }

    return res.status(StatusCodes.OK).json({ user });

  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { name, newEmail, phone_number, password, status } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }

    // Actualizar datos solo si se envían
    if (name) user.name = name;
    if (newEmail) user.email = newEmail;
    if (phone_number) user.phone_number = phone_number;
    if (status) user.status = status;

    // Si se actualiza la contraseña, hashearla antes de guardarla
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return res.status(StatusCodes.OK).json({ message: "Usuario actualizado correctamente", user });

  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

module.exports = { register, deleteUser, updateUser, readUser };
