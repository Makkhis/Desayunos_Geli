const { DataTypes } = require('sequelize');
const sequelize = require('../config/databases');

const User = sequelize.define(
        "User",
        {
            name: {type: DataTypes.STRING, allowNull: false},
            email: {type: DataTypes.STRING, allowNull: false, unique: true},
            phone_number: { type: DataTypes.INTEGER, allowNull: false},
            password: {type: DataTypes.STRING, allowNull: false},
            status: {type: DataTypes.STRING, allowNull: false}

        },
        {timestamps: true}
);

module.exports = User;