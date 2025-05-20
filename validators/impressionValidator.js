const { body } = require('express-validator');

module.exports = [
    body('pages')
        .notEmpty().withMessage('Hojas obligatorio')
        .isFloat({ gt: 0 }).withMessage('Hojas debe ser un número positivo'),

    body('cost')
        .notEmpty().withMessage('Costo obligatorio')
        .isFloat({ gt: 0 }).withMessage('Costo debe ser un número positivo'),

    body('numAccount')
        .notEmpty().withMessage('Número de cuenta obligatorio')
        .isInt().withMessage('Número de cuenta debe ser un número entero'),

];
