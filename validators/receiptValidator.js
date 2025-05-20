const { body } = require('express-validator');

module.exports = [
  body('fol')
    .notEmpty().withMessage('Folio obligatorio')
    .isString().withMessage('Folio debe ser una cadena'),

  body('amount')
    .notEmpty().withMessage('Monto obligatorio')
    .isFloat({ gt: 0 }).withMessage('Monto debe ser un número positivo'),

  body('date')
    .notEmpty().withMessage('Fecha obligatoria')
    .isISO8601().withMessage('Fecha inválida YYYY-MM-DD'),

  body('numAccount')
    .notEmpty().withMessage('Número de cuenta obligatorio')
    .isInt().withMessage('Número de cuenta debe ser un número entero'),
];
