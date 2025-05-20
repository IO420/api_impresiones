const { body } = require('express-validator');

module.exports = [
    body('user')
        .notEmpty().withMessage('El usuario es obligatorio')
        .isString().withMessage('El usuario debe ser una cadena'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isString().withMessage('La contraseña debe ser una cadena')
];
