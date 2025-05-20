const { body } = require('express-validator');

module.exports = [
    body('numAccount')
        .notEmpty().withMessage('El numero de cuenta es obligatorio')
        .isInt().withMessage('Número de cuenta debe ser un número entero'),
];
