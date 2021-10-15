const { response, request } = require('express');

const project = require('../models/project');
const crearProject = async(req, res) => {

    const fechaActual = new Date();
    const { titulo, user } = req.body;
    try {
        const resultado = await project.create({
            titulo,
            user,
            estado: true,
            fecha: fechaActual.toISOString().replace(/T/, ' ').replace(/\..+/, '')

        });
        if (resultado) {

            return res.status(201).json({
                ok: true,
                msg: 'registro exitoso',
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




const listaProjects = async(req, res) => {

    const fechaActual = new Date();
    const { user } = req.params;
    try {
        const resultado = await project.findAll({
            where: { user }
        });
        if (resultado) {

            return res.status(201).json({
                ok: true,
                data: resultado,
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


module.exports = { listaProjects, crearProject }