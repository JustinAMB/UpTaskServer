const express = require('express');
const router = express.Router();

const { listaTasks, crearTask } = require('../controllers/task');
router.post('/create', crearTask);
router.get('/:project', listaTasks);
module.exports = router;