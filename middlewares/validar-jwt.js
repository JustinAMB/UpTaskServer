const { response } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');


const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        });
    }

    try {

        const { id, username } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.id = id;
        req.username = username;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }



    // TODO OK!
    next();
}


module.exports = {
    validarJWT
}