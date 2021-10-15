const Sequelize = require('sequelize');
const db = require('../db');
const project = db.define('projects', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false,

    },
    estado: {
        type: Sequelize.BOOLEAN,
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
module.exports = project;