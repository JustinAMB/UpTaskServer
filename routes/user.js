const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const { loginUser, registroUser, revalidarToken } = require('../controllers/user');
router.post('/registro', registroUser);
router.post('/login', loginUser);

router.get('/renew', validarJWT, revalidarToken);
module.exports = router;