const { response, request } = require('express');

const { generarJWT } = require('../helpers/jwt');
const user = require('../models/user');




const loginUser = async(req, res = response) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const userLogin = await user.findOne({
            where: { email }
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }





}

module.exports = { loginUser, registroUser, revalidarToken }