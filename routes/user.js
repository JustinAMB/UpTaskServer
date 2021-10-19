const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const { loginUser, registroUser, revalidarToken } = require('../controllers/user');
router.post('/registro', [check('username', 'El nombre de usuario es obligatorio').not().isEmpty(), check('email', 'el email es obligatorio').isEmail(), check('password', 'la contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], registroUser);
router.post('/login', [check('email', 'el email es obligatorio').isEmail(), check('password', 'la contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], loginUser);

router.get('/renew', validarJWT, revalidarToken);
module.exports = router;