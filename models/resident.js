//const { DataTypes } = require("sequelize/types");
//const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => (
    sequelize.define('resident', {
        room: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
    }, {
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })
);