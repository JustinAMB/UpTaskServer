const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { listaTasks, crearTask } = require('../controllers/task');
router.post('/create', [check('descripcion', 'la descripcion es obligatoria').not().isEmpty(),
    validarCampos
], crearTask);
router.get('/:project', listaTasks);
module.exports = router;