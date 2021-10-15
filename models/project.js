const Sequelize = require('sequelize');
const db = require('../db');
const task = db.define('project', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATETIME,
        allowNull: false,

    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    user: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports.module = task;