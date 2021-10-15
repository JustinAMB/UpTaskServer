const { response, request } = require('express');
const mysqlConnection = require('../database.js');
const { generarJWT } = require('../helpers/jwt');
const user = require('user');
const { Where } = require('sequelize/types/lib/utils');



const loginUser = async(req = request, res = response) => {
    try {
        const { correo, password } = req.body;
        const userLogin = await user.findOne({
            where: { email: correo }
        });
        if (!userLogin) {

            return res.status(403).json({
                ok: false,
                msg: 'Este usuario no existe '
            });
        } else {
            if (userLogin.password === password) {
                const token = await generarToken(userLogin.id, userLogin.username);
                return res.status(200).json({
                    ok: true,
                    msg: 'Ingreso permitido',
                    data: userLogin,
                    token
                });
            } else {
                return res.status(403).json({
                    ok: false,
                    msg: 'Contraseña incorrecta , intentalo de nuevo'
                });
            }
        }
    } catch (err) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}
const registroUser = async(req = request, res = response) => {
    try {
        const { email, password, username } = req.body;
        const usuario = await user.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        const resultado = await user.create({
            username,
            email,
            password
        });
        if (resultado) {
            const token = await generarToken(resultado.id, resultado.username);
            return res.status(201).json({
                ok: true,
                msg: 'registro exitoso',
                data: resultado,
                token
            });


        } else {
            return res.status(401).json({
                ok: false,
                msg: 'Ha ocurrido un error,intentalo de nuevo',

            });
        }
    } catch (err) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const revalidarToken = async(req, res = response) => {

    const { id } = req;

    try {




        // Leer la base de datos
        const userSearch = await user.findByPk(id);

        // Generar el JWT
        const token = await generarJWT(id, userSearch.username);

        return res.json({
            ok: true,
            data: userSearch,
            token
        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }





}

exports.module = { loginUser, registroUser, revalidarToken }