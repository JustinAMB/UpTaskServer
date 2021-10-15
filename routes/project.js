const express = require('express');
const router = express.Router();

const { listaProjects, crearProject } = require('../controllers/project');
router.post('/create', crearProject);
router.get('/:user', listaProjects);
module.exports = router;