const { DataTypes } = require('sequelize');
const sequelize = require('../config/databases');

const User = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone_number: { type: DataTypes.INTEGER, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    
    // 👇 Nuevo campo: role
    role: {
      type: DataTypes.ENUM("alumno", "docente", "administrador"),
      allowNull: false,
      defaultValue: "alumno" // Por si no envían, por default es alumno
    }
  },
  { timestamps: true }
);

module.exports = User;
