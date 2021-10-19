const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { listaProjects, crearProject } = require('../controllers/project');

router.post('/create', [check('titulo', 'el titulo es obligatorio').not().isEmpty(),
    validarCampos
], crearProject);
router.get('/:user', listaProjects);
module.exports = router;