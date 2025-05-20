const express = require('express');
const router = express.Router();
const connection = require('../db');
const impressionValidator = require('../validators/impressionValidator');
const handleValidation = require('../middleware/handleValidation');
const verifyToken = require('../middleware/verifyToken');

router.post('/',
    verifyToken,
    impressionValidator,
    handleValidation,
    (req, res) => {
        const { cost, numAccount, pages } = req.body;
        const idUser = req.user.id_usuario;

        connection.query(
            'SELECT credito FROM alumno WHERE id_cuenta = ?',
            [numAccount],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al consultar crédito del alumno' });
                }

                if (results.length === 0) {
                    return res.status(404).json({ error: 'Alumno no encontrado' });
                }

                const currentCredit = parseFloat(results[0].credito);
                const requestedCost = parseFloat(cost);

                if (isNaN(currentCredit) || isNaN(requestedCost)) {
                    return res.status(400).json({ error: 'Valores numéricos inválidos' });
                }

                if (currentCredit < requestedCost) {
                    return res.status(400).json({ error: 'Crédito insuficiente' });
                }

                // Paso 3: Iniciar transacción
                connection.beginTransaction((err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error al iniciar la transacción' });
                    }

                    const insertQuery = `
                    INSERT INTO detalle_servicio (monto, fecha_operacion, id_cuenta, id_servicio, id_usuario, numero_hojas)
                    VALUES (?, NOW(), ?, 1, ?, ?)
                `;
                    connection.query(insertQuery, [requestedCost, numAccount, idUser, pages], (err, results) => {
                        if (err) {
                            return connection.rollback(() => {
                                res.status(500).json({ error: 'Error al insertar detalle_servicio' });
                            });
                        }

                        const updateQuery = `
                        UPDATE alumno SET credito = credito - ? WHERE id_cuenta = ?
                    `;
                        connection.query(updateQuery, [requestedCost, numAccount], (err, results) => {
                            if (err) {
                                return connection.rollback(() => {
                                    res.status(500).json({ error: 'Error al actualizar crédito' });
                                });
                            }

                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        res.status(500).json({ error: 'Error al confirmar transacción' });
                                    });
                                }

                                res.json({ message: 'Impresión registrada y crédito actualizado correctamente' });
                            });
                        });
                    });
                });
            }
        );
    });

module.exports = router;
