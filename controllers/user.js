const { response } = require('express');
const mysqlConnection = require('../database.js');
const { generarJWT } = require('../helpers/jwt');