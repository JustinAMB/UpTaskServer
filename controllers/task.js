const { response, request } = require('express');

const task = require('../models/task');
const crearTask = async(req, res) => {

    const fechaActual = new Date();
    const { descripcion, project } = req.body;
    try {
        const resultado = await task.create({
            descripcion,
            project,
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
                msg: 'Ha ocurrido un error, intentalo de nuevo'
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




const listaTasks = async(req, res) => {


    const { project } = req.params;
    try {
        const resultado = await task.findAll({
            where: { project }
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
const cambiarEstadoTask = async(req, res) => {


    const { id } = req.params;
    try {
        const resultado = await task.findByPk(id);
        if (resultado) {
            resultado.estado = !resultado.estado;












            const taskUpdate = await task.update({
                estado: resultado.estado,
            }, {
                where: {
                    id: resultado.id,
                }
            });
            return res.status(201).json({
                ok: true,
                msg: 'se ha actualizado exitosamente',
                data: taskUpdate
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


module.exports = { listaTasks, crearTask, cambiarEstadoTask }