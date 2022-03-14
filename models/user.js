//const { DataTypes } = require("sequelize/types");
//const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        uid: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        nick: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        floor: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true.valueOf,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })
);