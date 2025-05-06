const UserModel = require("../../models/User.js");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1) Registro
const register = async (req, res) => {
  try {
    const { name, email, phone_number, password, status, role } = req.body;

    if (!name || !email || !phone_number || !password || !status || !role) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Todos los campos son obligatorios." });
    }

    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({ error: "El usuario ya existe con ese email." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      phone_number,
      password: hashedPassword,
      status,
      role
    });

    // Generar token (aunque solo sirva para sesión)
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET,
      { expiresIn: '13h' } // 13 horas válido
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Usuario registrado correctamente",
      token, // 👈🏼 Devuelvo token
      user: { id: user.id, name, email, role: user.role }
    });

  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 2) Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Email y contraseña son obligatorios." });
    }

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Contraseña incorrecta." });
    }

    // Generar token con su rol
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET,
      { expiresIn: '13h' }
    );

    return res.status(StatusCodes.OK).json({
      message: "Login exitoso",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 3) Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(StatusCodes.OK).json(users);
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 4) Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 4) Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_number, status, role } = req.body;

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }

    await user.update({ name, email, phone_number, status, role });
    return res.status(StatusCodes.OK).json({ message: "Usuario actualizado correctamente." });
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 5) Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }
    await user.destroy();
    return res.status(StatusCodes.OK).json({ message: "Usuario eliminado correctamente." });
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 6) Activar usuario
const activateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }
    await user.update({ status: "activo" });
    return res.status(StatusCodes.OK).json({ message: "Usuario activado." });
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 7) Desactivar usuario
const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }
    await user.update({ status: "inactivo" });
    return res.status(StatusCodes.OK).json({ message: "Usuario desactivado." });
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 8) Buscar usuario por correo
const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuario no encontrado." });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 9) Buscar usuarios por rol
const searchUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    const users = await UserModel.findAll({ where: { role } });
    return res.status(StatusCodes.OK).json(users);
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 10) Contar usuarios totales
const countUsers = async (req, res) => {
  try {
    const count = await UserModel.count();
    return res.status(StatusCodes.OK).json({ total: count });
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};

// 11) Contar usuarios por rol
const countUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    const count = await UserModel.count({ where: { role } });
    return res.status(StatusCodes.OK).json({ total: count });
  } catch (exception) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: exception.message });
  }
};


module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  activateUser,
  deactivateUser,
  searchUserByEmail,
  searchUsersByRole,
  countUsers,
  countUsersByRole
};
