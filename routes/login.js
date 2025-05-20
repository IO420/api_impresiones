const express = require('express');
const router = express.Router();
const connection = require('../db');
const loginValidator = require('../validators/loginValidator');
const handleValidation = require('../middleware/handleValidation');
const envConfig = require('../envConfigurations/EnvConfigurations');
const jwt = require('jsonwebtoken');

router.post('/',
    loginValidator,
    handleValidation,
    (req, res) => {
        const { user, password } = req.body;
        connection.query(
            'SELECT a.id_usuario , a.usuario , a.password , b.id_perfil , perfil FROM usuario a JOIN perfil b ON (a.id_perfil = b.id_perfil) WHERE a.usuario = ? AND a.password = ? AND a.activo = 1;',
            [user, password],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al consultar' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ error: 'User o password incorrecta' });
                }

                const userData = results[0];

                const payload = {
                    id_usuario: userData.id_usuario,
                    usuario: userData.usuario,
                    perfil: userData.perfil,
                    id_perfil: userData.id_perfil,
                };

                const token = jwt.sign(payload, envConfig.jwtSecret, {
                    expiresIn: '8h',
                });

                res.json({ token: token });
            });
    });

module.exports = router;
