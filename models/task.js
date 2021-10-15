const Sequelize = require('sequelize');
const db = require('../db');
const task = db.define('task', {
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATETIME,
        allowNull: false,

    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    project: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
module.exports = task;